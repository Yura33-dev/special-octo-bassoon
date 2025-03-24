'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Filter } from '@/models';
import { ICreateFilterFormField, IFilterApi } from '@/types';

export async function createFilter(
  data: ICreateFilterFormField
): Promise<IFilterApi | undefined> {
  if (data.variants.length < 1) {
    throw new Error('Вкажіть хоча б одну варіацію фільтра');
  }

  try {
    await dbConnect();

    const isFilterExist = await Filter.findOne({ slug: data.slug });

    if (isFilterExist) {
      throw new Error('Фільтр з таким ідентифікатором вже існує');
    }

    const result: IFilterApi = await Filter.create(data);

    if (!result) {
      throw new Error('Виникла помилка при збережені фільтру');
    }

    revalidatePath('/*/dashboard/filters');
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error('Some error occurred while filter creating...', error);
    }
  }
}
