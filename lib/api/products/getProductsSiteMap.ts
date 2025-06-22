'use server';

import { PRODUCTS_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Product } from '@/models';
import { IProductPopulated } from '@/types';

export async function getProductsSiteMap() {
  try {
    await dbConnect();

    const products = await Product.find()
      .sort({ createdAt: -1, _id: -1 })
      .populate('categories')
      .lean<Array<IProductPopulated>>();
    return products;
  } catch (e) {
    console.error(PRODUCTS_FETCH_FAILED, e);
    return [];
  }
}
