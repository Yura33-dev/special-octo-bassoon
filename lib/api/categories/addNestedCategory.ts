'use server';
import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Category } from '@/models';

export async function addNestedCategory(
  categoryId: string,
  baseCategoryId: string,
  isMain: boolean
) {
  try {
    await dbConnect();

    if (isMain) {
      const updateBaseCategory = await Category.findOneAndUpdate(
        { _id: { $in: baseCategoryId } },
        { $addToSet: { childCategories: categoryId } },
        { new: true }
      );

      if (!updateBaseCategory) throw new Error('Базова категорія не знайдена');

      const updateCategory = await Category.findOneAndUpdate(
        { _id: { $in: categoryId } },
        { $addToSet: { parentCategories: baseCategoryId } },
        { new: true }
      );

      if (!updateCategory) throw new Error('Категорія не знайдена');
    } else {
      const updateBaseCategory = await Category.findOneAndUpdate(
        { _id: { $in: baseCategoryId } },
        { $addToSet: { parentCategories: categoryId } },
        { new: true }
      );

      if (!updateBaseCategory) throw new Error('Базова категорія не знайдена');

      const updateCategory = await Category.findOneAndUpdate(
        { _id: { $in: categoryId } },
        { $addToSet: { childCategories: baseCategoryId } },
        { new: true }
      );

      if (!updateCategory) throw new Error('Категорія не знайдена');
    }

    revalidatePath('/*/dashboard/categories');
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error('Some error occured while category patching...', error);
      throw new Error('Сталася помилка при оновлені категорії');
    }
  }
}
