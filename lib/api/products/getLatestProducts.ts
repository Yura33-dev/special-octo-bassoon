'use server';

import { DB_CONNECTION_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapProduct } from '@/lib/utils';
import { Product } from '@/models';
import { IProductApi, locale } from '@/types';

export async function getLatestProducts(locale: locale, limit: number = 20) {
  const connection = await dbConnect();

  if (!connection) {
    throw new Error(DB_CONNECTION_FAILED);
  }

  const productsQuery = Product.find();

  const [products] = await Promise.all([
    productsQuery
      .sort({ createdAt: 'desc' })
      .limit(limit)
      .populate('categories')
      .populate('packaging.default')
      .populate('packaging.items.packId')
      .lean<Array<IProductApi>>()
      .exec(),
  ]);

  const mappedProducts = products.map(product => mapProduct(product, locale));

  return { products: mappedProducts };
}
