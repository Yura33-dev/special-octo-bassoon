/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { PRODUCTS_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { calculatePaginationData, mapProduct } from '@/lib/utils';
import { Category, Product } from '@/models';
import { IProductPopulated, locale } from '@/types';

export async function getAllProducts(
  locale: locale,
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

    const query: any = {};

    if (parsedFilter.category) {
      const categorySlug = parsedFilter.category as string;

      const categories = await Category.find({
        [`slug.${locale}`]: categorySlug,
      });

      if (categories.length > 0) {
        query.categories = { $in: categories.map(cat => cat._id) };
      }
    }

    // Фильтрация по другим параметрам ("filters")
    const filterConditions = Object.keys(parsedFilter)
      .map(filterSlug => {
        if (filterSlug === 'category') return null;

        const filterValues = parsedFilter[filterSlug];
        return {
          filters: {
            $elemMatch: {
              value: { $in: filterValues },
            },
          },
        };
      })
      .filter(Boolean);

    if (filterConditions.length > 0) {
      query.$and = filterConditions;
    }

    const [productsCount, products, totalCount] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .sort({ createdAt: -1, _id: -1 })
        .skip(skip)
        .limit(limit)
        .populate('categories')
        .populate('packaging.default')
        .populate('packaging.items.packId')
        .populate('filters.filter')
        .populate('producer')
        .lean<Array<IProductPopulated>>()
        .exec(),
      Product.countDocuments(),
    ]);

    const paginationData = calculatePaginationData(productsCount, limit, page);

    const mappedProducts = products.map(product => mapProduct(product));

    return {
      products: mappedProducts,
      paginationData,
      totalProducts: totalCount,
    };
  } catch (e) {
    console.error(PRODUCTS_FETCH_FAILED, e);
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
