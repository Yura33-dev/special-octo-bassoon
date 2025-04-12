'use server';

import dbConnect from '@/lib/db';
import { mapProducer } from '@/lib/utils';
import { Producer } from '@/models';
import { IProducerMapped, IProducerPopulated } from '@/types';

export async function getProducerById(
  producerId: string
): Promise<IProducerMapped | null> {
  try {
    await dbConnect();

    const producer = await Producer.findOne({
      _id: producerId,
    }).lean<IProducerPopulated>();

    if (!producer) {
      throw new Error('Виробника з таким ідентифікатором не існує');
    }

    return mapProducer(producer);
  } catch (error) {
    console.error(`Помилка при завантажені виробника. ${error}`);
    return null;
  }
}
