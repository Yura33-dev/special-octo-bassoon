'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Packaging } from '@/models';
import { IPackagingApi } from '@/types';

export async function getPackagingById(
  packId: string
): Promise<IPackagingApi | null> {
  try {
    await dbConnect();

    const packaging: IPackagingApi | null = await Packaging.findOne({
      _id: packId,
    });

    if (!packaging) {
      throw new Error('Виникла помилка при завантажені пакування');
    }

    revalidatePath('/*/dashboard/packaging');
    return JSON.parse(JSON.stringify(packaging));
  } catch (error) {
    console.error(`Помилка при завантажені пакування. ${error}`);
    return null;
  }
}
