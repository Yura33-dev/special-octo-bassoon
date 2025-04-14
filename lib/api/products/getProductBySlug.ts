'use server';

import { PRODUCT_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapProduct } from '@/lib/utils';
import { Product } from '@/models';
import { IProductMapped, IProductPopulated, locale } from '@/types';

export async function getProductBySlug(
  slug: string,
  locale: locale
): Promise<IProductMapped | null> {
  try {
    await dbConnect();

    const product = await Product.findOne({
      [`translatedData.${locale}.slug`]: slug,
    })
      .populate('categories')
      .populate('packaging.default')
      .populate('packaging.items.packId')
      .populate('filters.filter')
      .populate('producer')
      .lean<IProductPopulated>();

    if (!product)
      throw new Error('Продукт за вказанним ідентифікатором не знайдений');

    return mapProduct(product);
  } catch (e: unknown) {
    console.error(PRODUCT_FETCH_FAILED, e);
    return null;
  }
}
