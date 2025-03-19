'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Category } from '@/models';
import { ICategoryApi, IEditCategoryStructured } from '@/types';

export async function patchCategoryById(
  categoryId: string,
  data: Partial<IEditCategoryStructured>
): Promise<ICategoryApi | null> {
  try {
    await dbConnect();

    const result: ICategoryApi | null = await Category.findOneAndUpdate(
      { _id: categoryId },
      data,
      { new: true }
    );

    if (!result) throw new Error('Категорію не знайдено');

    revalidatePath('/*/dashboard/categories');
    return JSON.parse(JSON.stringify(result));
  } catch (error: unknown) {
    console.error('Some error occured while category patching...', error);
    throw new Error('Сталася помилка при оновлені категорії');
  }
}
