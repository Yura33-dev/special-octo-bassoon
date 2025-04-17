'use server';

import { CATEGORIES_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapCategory } from '@/lib/utils';
import { Category } from '@/models';
import { ICategoryMapped, ICategoryPopulated } from '@/types';

export async function getAllCategories(
  filter: Record<string, string> | object = {}
): Promise<Array<ICategoryMapped> | []> {
  try {
    await dbConnect();

    const categories = await Category.find(filter)
      .populate('childCategories')
      .populate('parentCategories')
      .lean<Array<ICategoryPopulated>>();

    return categories
      .map(category => mapCategory(category))
      .toSorted((a, b) => a.sortOrder - b.sortOrder);
  } catch (error) {
    console.error(`Error: ${CATEGORIES_FETCH_FAILED}. ${error}`);
    return [];
  }
}
