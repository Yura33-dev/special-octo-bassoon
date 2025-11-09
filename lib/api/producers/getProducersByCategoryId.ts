'use server';

import { PRODUCERS_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapProducer } from '@/lib/utils';
import { Producer, Product } from '@/models';
import { IProducerMapped, IProducerPopulated, locale } from '@/types';

export async function getProducersByCategoryId(
  categoryId: string,
  locale: locale
): Promise<Array<IProducerMapped> | []> {
  try {
    await dbConnect();

    const producerIds = await Product.distinct('producer', {
      categories: categoryId,
      visible: true,
      producer: { $ne: null },
    });

    if (producerIds.length === 0) {
      return [];
    }

    const producers = await Producer.find({
      _id: { $in: producerIds },
    })
      .lean<Array<IProducerPopulated>>()
      .exec();

    return producers
      .map(producer => mapProducer(producer))
      .toSorted((a, b) =>
        a.translatedData[locale].title.localeCompare(
          b.translatedData[locale].title
        )
      );
  } catch (error) {
    console.error(`Error: ${PRODUCERS_FETCH_FAILED}. ${error}`);
    return [];
  }
}
