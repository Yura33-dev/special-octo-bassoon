'use server';

import mongoose from 'mongoose';
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

    const normalizedPackagingPrice = product.packaging.items.map(packaging => ({
      ...packaging,
      packId: packaging.packId
        ? new mongoose.Types.ObjectId(packaging.packId)
        : null,
      price: packaging.price ? packaging.price * 100 : null,
    }));

    const normalizedProduct = {
      ...product,
      categories: product.categories.map(
        categoryId => new mongoose.Types.ObjectId(categoryId)
      ),
      producer: product.producer
        ? new mongoose.Types.ObjectId(product.producer)
        : null,
      packaging: {
        default: product.packaging.default
          ? new mongoose.Types.ObjectId(product.packaging.default)
          : null,
        items: normalizedPackagingPrice,
      },
      filters: product.filters.map(filter => ({
        id: filter.id,
        filter: new mongoose.Types.ObjectId(filter.filter),
        values: filter.values || [],
      })),
      imgUrl:
        typeof product.imgUrl === 'string' ? product.imgUrl : '/no-image.webp',
    };

    const createdProduct: IProductApi = await Product.create(normalizedProduct);

    if (!createdProduct)
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
