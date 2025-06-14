'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Filter, Producer, Product } from '@/models';
import { IFilterApi, IProducerApi, IProducerForm, IProductApi } from '@/types';

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

    const updatedFilter: IFilterApi | null = await Filter.findOneAndUpdate(
      {
        slug: 'virobnik',
        'variants.translatedData.uk.variantTitle':
          producer.translatedData.get('uk')?.title,
      },
      {
        $set: {
          'variants.$.variantSlug': data.slug,
          'variants.$.translatedData.uk.variantTitle':
            data.translatedData['uk'].title,
          'variants.$.translatedData.ru.variantTitle':
            data.translatedData['ru'].title,
        },
      }
    );

    if (updatedFilter) {
      const productsWithProducer: Array<IProductApi> | null =
        await Product.find({ 'filters.value': producer.slug });

      await Promise.all(
        productsWithProducer.map(product =>
          Product.updateOne(
            { _id: product._id },
            {
              $set: { 'filters.$[filter].value': data.slug },
            },
            {
              arrayFilters: [{ 'filter.value': producer.slug }],
            }
          )
        )
      );
    }

    revalidatePath('/*/dashboard/filters');
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
