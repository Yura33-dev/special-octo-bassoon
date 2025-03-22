'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Packaging } from '@/models';
import {
  ICreatePackagingStructured as IEditCreatePackagingStructured,
  IPackagingApi,
} from '@/types';

export async function patchPackagingById(
  packId: string,
  data: Partial<IEditCreatePackagingStructured>
): Promise<IPackagingApi | null> {
  try {
    await dbConnect();

    const result: IPackagingApi | null = await Packaging.findOneAndUpdate(
      { _id: packId },
      data,
      { new: true }
    );

    if (!result) throw new Error('Пакування не знайдено для редагування');

    revalidatePath('/*/dashboard/packaging');
    return JSON.parse(JSON.stringify(result));
  } catch (error: unknown) {
    console.error('Some error occured while packaging patching...', error);
    throw new Error('Сталася помилка при оновлені пакування');
  }
}
