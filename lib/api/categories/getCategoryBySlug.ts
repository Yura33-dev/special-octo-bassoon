'use server';

import dbConnect from '@/lib/db';
import { mapCategory } from '@/lib/utils';
import { Category } from '@/models';
import { ICategoryPopulated } from '@/types';

export async function getCategoryBySlug(
  slug: string,
  locales: readonly string[]
) {
  try {
    await dbConnect();

    const category = await Category.findOne({
      $or: locales.map(locale => ({ [`slug.${locale}`]: slug })),
    })
      .populate('childCategories')
      .populate('parentCategories')
      .lean<ICategoryPopulated>();

    if (!category) throw new Error('Категорія не знайдена');
    return mapCategory(category);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(
        'Some error occured while category fetching by slug...',
        error
      );
    }
  }
}
