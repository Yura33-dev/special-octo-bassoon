'use server';

import mongoose from 'mongoose';
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
      packId: packaging.packId
        ? new mongoose.Types.ObjectId(packaging.packId)
        : null,
      price: packaging.price ? packaging.price * 100 : null,
      oldPrice: packaging.oldPrice ? packaging.oldPrice * 100 : 0,
      inStock: packaging.inStock,
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

    const updatedProduct: IProductApi | null = await Product.findOneAndUpdate(
      {
        $or: locales.map(locale => ({
          [`translatedData.${locale}.slug`]: productSlug,
        })),
      },
      { $set: normalizedProduct },
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
