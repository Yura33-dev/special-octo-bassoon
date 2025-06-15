'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Category } from '@/models';

export async function removeNestedCategory(
  categoryId: string,
  baseCategoryId: string,
  isMain: boolean
) {
  try {
    await dbConnect();

    if (isMain) {
      const updateParentCategory = await Category.findOneAndUpdate(
        { _id: baseCategoryId },
        { $pull: { childCategories: categoryId } },
        { new: true }
      );

      if (!updateParentCategory)
        throw new Error('Базова категорія не знайдена');

      const updateChildCategory = await Category.findOneAndUpdate(
        { _id: categoryId },
        { $pull: { parentCategories: baseCategoryId } },
        { new: true }
      );

      if (!updateChildCategory) throw new Error('Категорія не знайдена');
    } else {
      const updateChildCategory = await Category.findOneAndUpdate(
        { _id: baseCategoryId },
        { $pull: { parentCategories: categoryId } },
        { new: true }
      );

      if (!updateChildCategory) throw new Error('Базова категорія не знайдена');

      const updateParentCategory = await Category.findOneAndUpdate(
        { _id: categoryId },
        { $pull: { childCategories: baseCategoryId } },
        { new: true }
      );

      if (!updateParentCategory) throw new Error('Категорія не знайдена');
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
