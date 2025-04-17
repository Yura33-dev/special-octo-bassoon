'use server';

import dbConnect from '@/lib/db';
import { mapCategory } from '@/lib/utils';
import { Category } from '@/models';
import { ICategoryPopulated } from '@/types';

export async function getCategoryById(categoryId: string) {
  try {
    await dbConnect();

    const result = await Category.findOne({
      _id: categoryId,
    })
      .populate('childCategories')
      .populate('parentCategories')
      .lean<ICategoryPopulated>();

    if (!result) throw new Error('Категорія не знайдена');

    const mappedCategory = mapCategory(result);

    return mappedCategory;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(
        'Some error occured while category fetching by id...',
        error
      );
    }
  }
}
