'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Producer } from '@/models';
import { IProducerApi, IProducerForm } from '@/types';

export async function patchProducerById(
  producerId: string,
  data: IProducerForm
): Promise<undefined | null> {
  try {
    await dbConnect();

    const producer: IProducerApi | null = await Producer.findOneAndUpdate(
      { _id: producerId },
      data,
      { new: false }
    );

    if (!producer) throw new Error('Виробника не знайдено для редагування');

    revalidatePath('/*/dashboard/products');
    revalidatePath('/*/dashboard/producers');

    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error('Some error occured while producers patching...', error);
      throw new Error('Сталася помилка при оновлені виробника');
    }
  }
}
