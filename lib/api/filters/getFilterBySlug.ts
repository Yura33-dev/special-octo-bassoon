'use server';

import dbConnect from '@/lib/db';
import { mapFilter } from '@/lib/utils';
import { Filter } from '@/models';
import { IFilterMapped, IFilterPopulated } from '@/types';

export async function getFilterBySlug(
  filterSlug: string
): Promise<IFilterMapped | undefined> {
  try {
    await dbConnect();

    const filter = await Filter.findOne({
      slug: filterSlug,
    }).lean<IFilterPopulated>();

    if (!filter) {
      throw new Error('Фільтр з таким ідентифікатором не знайдений');
    }

    return mapFilter(filter);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(`Помилка при завантажені фільтра. ${error}`);
    }
  }
}
