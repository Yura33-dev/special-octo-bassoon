'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Product } from '@/models';
import { IProductForm, IProductApi } from '@/types';

export async function updateProduct(
  product: IProductForm
): Promise<IProductApi | undefined> {
  try {
    await dbConnect();

    const createdProduct: IProductApi | null = await Product.findOneAndUpdate(
      { 'translatedData.uk.slug': product.translatedData['uk'].slug },
      product
    );

    if (!createdProduct) throw new Error('Ідентифікатор товару не знайдений');

    revalidatePath('/*/dashboard/products');
    return JSON.parse(JSON.stringify(createdProduct));
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error('Some error occurred while product updating...', error);
    }
  }
}
