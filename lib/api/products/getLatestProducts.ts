'use server';

import { LATEST_PRODUCTS_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapProduct } from '@/lib/utils';
import { Product } from '@/models';
import { IProductApi, locale } from '@/types';

export async function getLatestProducts(locale: locale, limit: number = 20) {
  try {
    await dbConnect();

    const productsQuery = Product.find();

    const products = await productsQuery
      .sort({ createdAt: 'desc' })
      .limit(limit)
      .populate('categories')
      .populate('packaging.default')
      .populate('packaging.items.packId')
      .populate('filters.filter')
      .lean<Array<IProductApi>>()
      .exec();

    const mappedProducts = products.map(product => mapProduct(product, locale));
    return { products: mappedProducts };
  } catch (e) {
    console.error(LATEST_PRODUCTS_FETCH_FAILED, e);
    return { products: [] };
  }
}
