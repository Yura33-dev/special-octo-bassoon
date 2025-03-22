'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Packaging } from '@/models';
import { ICreatePackagingStructured, IPackaging, IPackagingApi } from '@/types';

export async function createPackaging(
  packData: ICreatePackagingStructured
): Promise<IPackaging | object> {
  try {
    await dbConnect();

    const packaging: IPackagingApi = await Packaging.create(packData);

    if (!packaging) {
      throw new Error('Виникла помилка при збережені пакування');
    }

    revalidatePath('/*/dashboard/packaging');
    return JSON.parse(JSON.stringify(packaging));
  } catch (error) {
    console.error(`Помилка при створенні пакування. ${error}`);
    return {};
  }
}
