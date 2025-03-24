'use server';

import dbConnect from '@/lib/db';
import { Filter } from '@/models';
import { ICreateFilterFormField, IFilterApi } from '@/types';

export async function patchFilterBySlug(
  data: ICreateFilterFormField,
  filterSlug: string
): Promise<IFilterApi | undefined> {
  try {
    await dbConnect();

    const isFilterExist = await Filter.findOne({ slug: filterSlug });

    if (!isFilterExist) {
      throw new Error('Фільтра з таким ідентифікатором не існує');
    }

    const result: IFilterApi | null = await Filter.findOneAndUpdate(
      { slug: filterSlug },
      data,
      { new: true }
    );

    if (!result) {
      throw new Error('Виникла помилка при оновлені фільтру');
    }

    return JSON.parse(JSON.stringify(result));
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error('Some error occurred while filter creating...', error);
    }
  }
}
