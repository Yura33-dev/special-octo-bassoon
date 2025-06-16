'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Category } from '@/models';
import { ICategoryApi, ICategoryForm } from '@/types';

export async function createCategory(
  categoryData: ICategoryForm
): Promise<ICategoryApi | undefined> {
  try {
    await dbConnect();

    const isCategoryExist = await Category.findOne({
      $or: [
        { 'slug.uk': categoryData.slug['uk'] },
        { 'slug.ru': categoryData.slug['ru'] },
      ],
    });

    if (isCategoryExist) {
      throw new Error('Вже існує категорія з таким посиланням');
    }

    const result: ICategoryApi = await Category.create(categoryData);

    if (!result) {
      throw new Error('Не вдалося зберегти категорію, спробуйте ще раз');
    }

    if (
      categoryData.parentCategories &&
      categoryData.parentCategories.length > 0
    ) {
      await Category.updateMany(
        { _id: { $in: categoryData.parentCategories } },
        { $addToSet: { childCategories: result._id } }
      );
    }

    if (
      categoryData.childCategories &&
      categoryData.childCategories.length > 0
    ) {
      await Category.updateMany(
        { _id: { $in: categoryData.childCategories } },
        { $addToSet: { parentCategories: result._id } }
      );
    }

    revalidatePath('/*/dashboard/categories');
    return JSON.parse(JSON.stringify(result));
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error('Some error occurred while category creating...', error);
    }
  }
}
