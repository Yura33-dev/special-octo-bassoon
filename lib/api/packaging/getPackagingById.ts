'use server';

import dbConnect from '@/lib/db';
import { mapPackaging } from '@/lib/utils';
import { Packaging } from '@/models';
import { IPackagingMapped, IPackagingPopulated } from '@/types';

export async function getPackagingById(
  packId: string
): Promise<IPackagingMapped | null> {
  try {
    await dbConnect();

    const packaging = await Packaging.findOne({
      _id: packId,
    }).lean<IPackagingPopulated>();

    if (!packaging) {
      throw new Error('Пакування з таким ідентифікатором не існує');
    }

    return mapPackaging(packaging);
  } catch (error) {
    console.error(`Помилка при завантажені пакування. ${error}`);
    return null;
  }
}
