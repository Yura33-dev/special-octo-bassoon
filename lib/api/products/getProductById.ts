'use server';

import { DB_CONNECTION_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapProduct } from '@/lib/utils';
import { Product } from '@/models';
import { IProductPopulated } from '@/types';

export async function getProductById(productId: string) {
  const connection = await dbConnect();

  if (!connection) {
    throw new Error(DB_CONNECTION_FAILED);
  }

  const product = await Product.findOne({ _id: productId })
    .populate('categories')
    .populate('packaging.default')
    .populate('packaging.items.packId')
    .populate('filters.filter')
    .populate('producer')
    .lean<IProductPopulated>();

  if (product) {
    const mappedProduct = mapProduct(product);

    return mappedProduct;
  }
}
