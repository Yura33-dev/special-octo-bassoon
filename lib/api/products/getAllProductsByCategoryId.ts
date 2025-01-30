'use server';

import { PRODUCTS_BY_CATEGORY_ID_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { calculatePaginationData, mapProduct } from '@/lib/utils';
import { Product } from '@/models';
import { IProductApi, locale } from '@/types';

export async function getAllProductsByCategoryId(
  locale: locale,
  categoryId: string,
  page: number = 1,
  limit: number = 9
) {
  try {
    await dbConnect();

    const skip = (page - 1) * limit;

    const productsQuery = Product.find({ categories: categoryId });

    const [productsCount, products] = await Promise.all([
      Product.find().merge(productsQuery).countDocuments(),
      productsQuery
        // .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .populate('categories')
        .populate('packaging')
        .lean<Array<IProductApi>>()
        .exec(),
    ]);

    const paginationData = calculatePaginationData(productsCount, limit, page);

    const mappedProducts = products.map(product => mapProduct(product, locale));

    return { products: mappedProducts, paginationData };
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
