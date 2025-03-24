'use server';

import dbConnect from '@/lib/db';
import { Filter } from '@/models';
import { IFilterApi } from '@/types';

export async function getFilterBySlug(
  filterSlug: string
): Promise<IFilterApi | undefined> {
  try {
    await dbConnect();

    const filter: IFilterApi | null = await Filter.findOne({
      slug: filterSlug,
    });

    if (!filter) {
      throw new Error('Фільтр з таким ідентифікатором не знайдений');
    }

    return JSON.parse(JSON.stringify(filter));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(`Помилка при завантажені фільтра. ${error}`);
    }
  }
}
