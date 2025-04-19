'use server';

import { PRODUCTS_BY_CATEGORY_ID_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { calculatePaginationData, mapProduct } from '@/lib/utils';
import { Product } from '@/models';
import { IProductPopulated } from '@/types';

export async function getAllProductsByCategoryId(
  categoryId: string,
  page: number = 1,
  limit: number = 9,
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

    const filterConditions = Object.keys(parsedFilter).map(filterSlug => {
      const filterValues = parsedFilter[filterSlug];

      return {
        filters: {
          $elemMatch: {
            value: { $in: filterValues },
          },
        },
      };
    });

    const query = {
      categories: categoryId,
      ...(filterConditions.length > 0 ? { $and: filterConditions } : {}),
    };

    const [productsCount, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .sort({
          labels: -1,
          createdAt: -1,
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
      const mappedProducts = products.map(product => mapProduct(product));
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
    console.error(PRODUCTS_BY_CATEGORY_ID_FAILED, e);
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
