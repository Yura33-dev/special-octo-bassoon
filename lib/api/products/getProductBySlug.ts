'use server';

import { DB_CONNECTION_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapProduct } from '@/lib/utils';
import { Product } from '@/models';
import { IProductApi, locale } from '@/types';

export async function getProductBySlug(slug: string, locale: locale) {
  const connection = await dbConnect();

  if (!connection) {
    throw new Error(DB_CONNECTION_FAILED);
  }

  const product = await Product.findOne({
    [`translatedData.${locale}.slug`]: slug,
  })
    .populate('categories')
    .populate('packaging.default')
    .populate('packaging.items.packId')
    .populate('filters.filter')
    .lean<IProductApi>();

  if (product) {
    const mappedProduct = mapProduct(product, locale);

    return mappedProduct;
  }
}
