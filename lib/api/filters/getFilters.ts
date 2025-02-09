'use server';

import { PRODUCTS_BY_CATEGORY_ID_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { extractFilters, mapProduct } from '@/lib/utils';
import { Product } from '@/models';
import { IProductApi, locale } from '@/types';

export async function getFilters(locale: locale, subcategoryId: string) {
  try {
    await dbConnect();

    const productsQuery = Product.find({ categories: subcategoryId });

    const products = await productsQuery
      .populate('categories')
      .populate('packaging.default')
      .populate('packaging.items.packId')
      .populate('filters.filter')
      .lean<Array<IProductApi>>()
      .exec();

    const mappedProducts = products.map(product => mapProduct(product, locale));

    const filters = extractFilters(mappedProducts);

    return { filters };
  } catch (e) {
    console.error(PRODUCTS_BY_CATEGORY_ID_FAILED, e);
    return {
      filters: [],
    };
  }
}
