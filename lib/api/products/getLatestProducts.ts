'use server';

import { LATEST_PRODUCTS_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapProduct } from '@/lib/utils';
import { Product } from '@/models';
import { IProductPopulated } from '@/types';

export async function getLatestProducts(limit: number = 20) {
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
      .populate('producer')
      .lean<Array<IProductPopulated>>()
      .exec();

    if (products.length > 0) {
      return products.map(product => mapProduct(product));
    } else {
      return [];
    }
  } catch (e) {
    console.error(LATEST_PRODUCTS_FETCH_FAILED, e);
    return [];
  }
}
