'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Product } from '@/models';
import { IProductForm, IProductApi } from '@/types';

export async function updateProduct(
  product: IProductForm,
  productSlug: string,
  locales: readonly string[]
): Promise<IProductApi | undefined> {
  try {
    await dbConnect();

    const normalizedPackagingPrice = product.packaging.items.map(packaging => ({
      ...packaging,
      price: packaging.price ? packaging.price * 100 : null,
    }));

    product.packaging.items = normalizedPackagingPrice;

    const updatedProduct: IProductApi | null = await Product.findOneAndUpdate(
      {
        $or: locales.map(locale => ({
          [`translatedData.${locale}.slug`]: productSlug,
        })),
      },
      { $set: { ...product } },
      { new: true }
    );

    if (!updatedProduct) throw new Error('Ідентифікатор товару не знайдений');

    revalidatePath('/*/dashboard/products');
    return JSON.parse(JSON.stringify(updatedProduct));
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error('Some error occurred while product updating...', error);
    }
  }
}
