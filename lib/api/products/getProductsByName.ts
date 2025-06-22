'use server';

import { PRODUCTS_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapProduct } from '@/lib/utils';
import { Product } from '@/models';
import { IProductPopulated } from '@/types';

export async function getProductsByName(
  name: string,
  locales: readonly string[],
  isAdmin: boolean = false
) {
  try {
    await dbConnect();
    let products: IProductPopulated[] = [];

    if (isAdmin) {
      products = await Product.find({
        $or: locales.map(locale => ({
          [`translatedData.${locale}.name`]: { $regex: name, $options: 'i' },
        })),
      })
        .populate('categories')
        .populate('packaging.default')
        .populate('packaging.items.packId')
        .populate('filters.filter')
        .populate('producer')
        .lean<Array<IProductPopulated>>();
    } else {
      products = await Product.find({
        $or: locales.map(locale => ({
          [`translatedData.${locale}.name`]: { $regex: name, $options: 'i' },
          visible: true,
        })),
      })
        .populate('categories')
        .populate('packaging.default')
        .populate('packaging.items.packId')
        .populate('filters.filter')
        .populate('producer')
        .lean<Array<IProductPopulated>>();
    }

    if (products) {
      const mappedProducts = products.map(product => mapProduct(product));

      return mappedProducts;
    } else {
      return [];
    }
  } catch (e: unknown) {
    console.error(PRODUCTS_FETCH_FAILED, e);
    return [];
  }
}
