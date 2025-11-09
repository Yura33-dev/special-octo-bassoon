'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Producer, Product } from '@/models';
import { IProducerApi } from '@/types';

export async function deleteProducerById(
  producerId: string
): Promise<undefined> {
  try {
    await dbConnect();

    const isProductWithProducerExist = await Product.exists({
      producer: producerId,
    });
    if (isProductWithProducerExist) {
      throw new Error('Спочатку видаліть цього виробника з усіх товарів');
    }

    const deletedProducer: IProducerApi | null =
      await Producer.findOneAndDelete({
        _id: producerId,
      });

    if (!deletedProducer)
      throw new Error('Виробника з таким ідентифікатором не знайдено');

    revalidatePath('/*/dashboard/products');

    return;
  } catch (error: unknown) {
    console.error('Some error occured while producer deleting...', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Сталася помилка при видалені виробника');
    }
  }
}
