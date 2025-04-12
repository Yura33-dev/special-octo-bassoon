'use server';

import { PRODUCERS_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapProducer } from '@/lib/utils';
import { Producer } from '@/models';
import { IProducerMapped, IProducerPopulated, locale } from '@/types';

export async function getAllProducers(
  locale: locale,
  filter: Record<string, string> | object = {}
): Promise<Array<IProducerMapped> | []> {
  try {
    await dbConnect();

    const packaging =
      await Producer.find(filter).lean<Array<IProducerPopulated>>();

    return packaging
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
