'use server';

import dbConnect from '@/lib/db';
import { Filter, Product } from '@/models';

export async function deleteFilterById(filterId: string) {
  try {
    await dbConnect();

    const isFilterExist = await Filter.exists({ _id: filterId });

    if (!isFilterExist) {
      throw new Error('Фільтр з таким ідентифікатором не існує');
    }

    await Promise.all([
      Product.updateMany(
        { 'filters.filter': filterId },
        { $pull: { filters: { filter: filterId } } }
      ),
      Filter.findOneAndDelete({ _id: filterId }),
    ]);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error('Some error occurred while filter creating...', error);
    }
  }
}
