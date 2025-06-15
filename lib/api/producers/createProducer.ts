'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Filter, Producer } from '@/models';
import { IProducerApi, IProducerForm } from '@/types';

export async function createProducer(
  data: IProducerForm
): Promise<undefined | object> {
  try {
    await dbConnect();

    const isProducerExist = await Producer.exists({ slug: data.slug });

    if (isProducerExist) {
      throw new Error('Такий виробник вже існує');
    }

    const producer: IProducerApi = await Producer.create(data);

    if (!producer) {
      throw new Error('Виникла помилка при збережені виробника');
    }

    const producerUkTitle = producer.translatedData.get('uk')?.title;
    const producerRuTitle = producer.translatedData.get('ru')?.title;

    const FilterObject = {
      variantSlug: producer.slug,
      translatedData: {
        uk: { variantTitle: producerUkTitle ?? 'Назва не вказана' },
        ru: { variantTitle: producerRuTitle ?? 'Назва не вказана' },
      },
    };

    await Filter.findOneAndUpdate(
      { slug: 'virobnik' },
      {
        $push: {
          variants: FilterObject,
        },
      }
    );

    revalidatePath('/*/dashboard/producers');
    revalidatePath('/*/dashboard/filters');
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      console.error(`Помилка при створенні виробника в CMS. ${error}`);
      throw new Error('Помилка при створенні виробника');
    }
  }
}
