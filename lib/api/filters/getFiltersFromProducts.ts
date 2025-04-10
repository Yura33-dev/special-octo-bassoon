'use server';

import { PRODUCTS_BY_CATEGORY_ID_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { extractFilters, mapProduct } from '@/lib/utils';
import { Product } from '@/models';
import { IProductPopulated, locale } from '@/types';

export async function getFiltersFromProducts(
  locale: locale,
  filter: object = {}
) {
  try {
    await dbConnect();

    const productsQuery = Product.find(filter);

    const products = await productsQuery
      .populate('categories')
      .populate('packaging.default')
      .populate('packaging.items.packId')
      .populate('filters.filter')
      .lean<Array<IProductPopulated>>()
      .exec();

    const mappedProducts = products.map(product => mapProduct(product));

    const filters = extractFilters(mappedProducts, locale);

    return { filters };
  } catch (e) {
    console.error(PRODUCTS_BY_CATEGORY_ID_FAILED, e);
    return {
      filters: [],
    };
  }
}
