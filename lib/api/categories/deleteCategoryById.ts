'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Category } from '@/models';
import { ICategoryApi } from '@/types';

export async function deleteCategoryById(
  categoryId: string
): Promise<ICategoryApi | undefined> {
  try {
    await dbConnect();

    const result = await Category.findOneAndDelete({ _id: categoryId });

    if (!result) throw new Error('Категорію не знайдено');

    await Category.updateMany(
      {
        $or: [
          { childCategories: categoryId },
          { parentCategories: categoryId },
        ],
      },
      {
        $pull: {
          childCategories: categoryId,
          parentCategories: categoryId,
        },
      }
    );

    revalidatePath('/*/dashboard/categories');
    return JSON.parse(JSON.stringify(result));
  } catch (error: unknown) {
    console.error('Some error occured while category deleting...', error);
    throw new Error('Сталася помилка при видалені категорії');
  }
}
