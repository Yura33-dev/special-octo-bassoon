'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Packaging, Product } from '@/models';
import { IPackagingApi } from '@/types';

export async function deletePackagingById(
  packId: string
): Promise<IPackagingApi | undefined> {
  try {
    await dbConnect();

    const productsWithSinglePackaging = await Product.find({
      'packaging.items.packId': packId,
    }).lean();

    const restrictedProducts = productsWithSinglePackaging.filter(
      product => product.packaging.items.length === 1
    );
    if (restrictedProducts.length > 0) {
      throw new Error(
        'Неможливо видалити пакування, яке є єдиним для деяких товарів'
      );
    }

    const result = await Packaging.findOneAndDelete({ _id: packId });
    if (!result) throw new Error('Пакування не знайдено в БД для видалення');

    await Product.updateMany(
      { 'packaging.items.packId': packId },
      {
        $pull: { 'packaging.items': { packId } },
      }
    );

    await Product.updateMany({ 'packaging.default': packId }, [
      {
        $set: {
          'packaging.default': {
            $let: {
              vars: {
                minPack: { $min: '$packaging.items.price' },
              },
              in: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: '$packaging.items',
                      as: 'item',
                      cond: { $eq: ['$$item.price', '$$minPack'] },
                    },
                  },
                  0,
                ],
              },
            },
          },
        },
      },
    ]);

    revalidatePath('/*/dashboard/packaging');
    return JSON.parse(JSON.stringify(result));
  } catch (error: unknown) {
    console.error('Some error occured while packaging deleting...', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Сталася помилка при видалені пакування');
    }
  }
}
