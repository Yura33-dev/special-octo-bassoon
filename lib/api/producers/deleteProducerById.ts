'use server';

import { revalidatePath } from 'next/cache';
import { slugify } from 'transliteration';

import dbConnect from '@/lib/db';
import { Filter, Producer, Product } from '@/models';
import { IFilterApi, IProducerApi, IProductApi } from '@/types';

export async function deleteProducerById(
  producerId: string
): Promise<undefined> {
  try {
    await dbConnect();

    const deletedProducer: IProducerApi | null =
      await Producer.findOneAndDelete({
        _id: producerId,
      });

    if (!deletedProducer)
      throw new Error('Виробника з таким ідентифікатором не знайдено');

    const updatedFilter: IFilterApi | null = await Filter.findOneAndUpdate(
      { slug: 'virobnik' },
      {
        $pull: {
          variants: {
            'translatedData.uk.variantTitle':
              deletedProducer.translatedData.get('uk')?.title,
          },
        },
      }
    );

    if (updatedFilter) {
      const productsWithProducer: Array<IProductApi> | null =
        await Product.find({
          'filters.value': slugify(
            deletedProducer.translatedData.get('uk')?.title ?? ''
          ),
        });

      await Promise.all(
        productsWithProducer.map(product =>
          Product.updateOne(
            { _id: product._id },
            {
              $pull: {
                filters: {
                  value: slugify(
                    deletedProducer.translatedData.get('uk')?.title ?? ''
                  ),
                },
              },
            }
          )
        )
      );
    }

    revalidatePath('/*/dashboard/filters');
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
