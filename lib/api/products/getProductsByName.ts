'use server';

import { PRODUCTS_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapProduct } from '@/lib/utils';
import { Product } from '@/models';
import { IProductApi, locale } from '@/types';

export async function getProductsByName(name: string, locale: locale) {
  try {
    await dbConnect();

    const products = await Product.find({
      [`translatedData.${locale}.name`]: { $regex: name, $options: 'i' },
    })
      .populate('categories')
      .populate('packaging.default')
      .populate('packaging.items.packId')
      .populate('filters.filter')
      .lean<Array<IProductApi>>();

    if (products) {
      const mappedProducts = products.map(product =>
        mapProduct(product, locale)
      );

      return mappedProducts;
    } else {
      return [];
    }
  } catch (e: unknown) {
    console.error(PRODUCTS_FETCH_FAILED, e);
    return [];
  }
}
