'use server';

import { CATEGORIES_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapCategory } from '@/lib/utils';
import { Category } from '@/models';
import { ICategory, ICategoryApi, locale } from '@/types';

export async function getAllCategories(
  locale: locale,
  filter: Record<string, string> | object = {}
): Promise<Array<ICategory> | []> {
  try {
    await dbConnect();

    const categories = await Category.find(filter)
      .populate('childCategories')
      .populate('parentCategories')
      .lean<Array<ICategoryApi>>();

    const transformedCategories = categories.map(category =>
      mapCategory(category, locale)
    );

    return transformedCategories;
  } catch (error) {
    console.error(`Error: ${CATEGORIES_FETCH_FAILED}. ${error}`);
    return [];
  }
}
