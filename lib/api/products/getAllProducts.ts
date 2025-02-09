'use server';

import { DB_CONNECTION_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { calculatePaginationData, mapProduct } from '@/lib/utils';
import { Product } from '@/models';
import { IProductApi, locale } from '@/types';

export async function getAllProducts(
  locale: locale,
  page: number = 1,
  limit: number = 9
) {
  const connection = await dbConnect();

  if (!connection) {
    throw new Error(DB_CONNECTION_FAILED);
  }

  const skip = (page - 1) * limit;

  const productsQuery = Product.find();

  const [productsCount, products] = await Promise.all([
    Product.find().merge(productsQuery).countDocuments(),
    productsQuery
      // .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate('categories')
      .populate('packaging.default')
      .populate('packaging.items.packId')
      .populate('filters.filter')
      .lean<Array<IProductApi>>()
      .exec(),
  ]);

  const paginationData = calculatePaginationData(productsCount, limit, page);

  const mappedProducts = products.map(product => mapProduct(product, locale));

  return { products: mappedProducts, paginationData };
}
