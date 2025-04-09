'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Product } from '@/models';
import { IProductForm, IProductApi } from '@/types';

export async function createProduct(
  product: IProductForm
): Promise<IProductApi | undefined> {
  try {
    await dbConnect();
    const isProductExist = await Product.findOne({
      $or: [
        { 'translatedData.uk.slug': product.translatedData['uk'].slug },
        { 'translatedData.ru.slug': product.translatedData['ru'].slug },
      ],
    });

    if (isProductExist)
      throw new Error('Продукт з таким ідентифікатором вже існує');

    const createdProduct: IProductApi = await Product.create(product);

    if (!createProduct)
      throw new Error('Сталася помилка при створенні продукту');

    revalidatePath('/*/dashboard/products');
    return JSON.parse(JSON.stringify(createdProduct));
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error('Some error occurred while product creating...', error);
    }
  }
}
