'use server';

import dbConnect from '@/lib/db';
import { mapCategory } from '@/lib/utils';
import { Category } from '@/models';
import { ICategoryApi, locale } from '@/types';

export async function getCategoryById(categoryId: string, locale: locale) {
  try {
    await dbConnect();

    const result: ICategoryApi | null = await Category.findOne({
      _id: categoryId,
    }).lean<ICategoryApi>();
    if (!result) throw new Error('Категорія не знайдена');

    const mappedCategory = mapCategory(result, locale);

    return mappedCategory;
  } catch (error: unknown) {
    console.error('Some error occured while category fetching...', error);
  }
}
