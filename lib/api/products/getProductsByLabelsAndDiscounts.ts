'use server';

import {
  DEFAULT_PAGE,
  LABELS_PRODUCTS_FETCH_FAILED,
  PRODUCT_DISPLAY_LIMIT,
} from '@/lib/constants';
import dbConnect from '@/lib/db';
import { calculatePaginationData, mapProduct } from '@/lib/utils';
import { Filter, Producer, Product } from '@/models';
import { IProductPopulated, queryType } from '@/types';

export async function getProductsByLabelsAndDiscounts(
  labels: string[],
  page: number = parseInt(DEFAULT_PAGE),
  limit: number = parseInt(PRODUCT_DISPLAY_LIMIT),
  filter: { [key: string]: string | string[] | undefined } = {}
) {
  try {
    await dbConnect();

    const skip = (page - 1) * limit;

    const parsedFilter = Object.fromEntries(
      Object.entries(filter).filter(
        ([key]) => key !== 'limit' && key !== 'page'
      )
    );

    const query: queryType = {
      visible: true,
      $or: [
        { labels: { $in: labels } },
        {
          'packaging.items': {
            $elemMatch: {
              oldPrice: { $exists: true, $gt: 0 },
            },
          },
        },
      ],
    };

    if (parsedFilter.producer) {
      const producerSlug = parsedFilter.producer as string;

      const producers = await Producer.find({
        slug: producerSlug,
      });

      if (producers.length > 0) {
        query.producer = { $in: producers.map(producer => producer._id) };
      }
    }

    // Фильтрация по другим параметрам ("filters")
    const filterSlugs = Object.keys(parsedFilter).filter(
      key => key !== 'producer'
    );

    if (filterSlugs.length > 0) {
      const filters = await Filter.find({
        slug: { $in: filterSlugs },
      });

      const filterConditions = filterSlugs
        .map(filterSlug => {
          const filterValues = parsedFilter[filterSlug];
          if (!filterValues) return null;

          const filterDoc = filters.find(f => f.slug === filterSlug);
          if (!filterDoc) return null;

          const valuesArray = Array.isArray(filterValues)
            ? filterValues
            : [filterValues];

          return {
            filters: {
              $elemMatch: {
                filter: filterDoc._id,
                values: { $in: valuesArray },
              },
            },
          };
        })
        .filter(Boolean);

      if (filterConditions.length > 0) {
        query.$and = filterConditions;
      }
    }

    const [productsCount, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .sort({
          createdAt: -1,
          _id: -1,
        })
        .skip(skip)
        .limit(limit)
        .populate('categories')
        .populate('packaging.default')
        .populate('packaging.items.packId')
        .populate('filters.filter')
        .populate('producer')
        .lean<Array<IProductPopulated>>()
        .exec(),
    ]);

    const paginationData = calculatePaginationData(productsCount, limit, page);

    if (products.length > 0) {
      const mappedProducts = products.map(product => {
        const mappedProduct = mapProduct(product);

        mappedProduct.packaging.items = mappedProduct.packaging.items.filter(
          pack => pack.inStock === true
        );

        return mappedProduct;
      });

      return { products: mappedProducts, paginationData };
    }

    return {
      products: [],
      paginationData: {
        page: 0,
        perPage: 0,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  } catch (e) {
    console.error(LABELS_PRODUCTS_FETCH_FAILED, e);
    return {
      products: [],
      paginationData: {
        page: 0,
        perPage: 0,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}
