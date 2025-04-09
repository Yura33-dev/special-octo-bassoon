'use server';

import dbConnect from '@/lib/db';
import { Product } from '@/models';

export async function deleteProductById(productId: string) {
  try {
    await dbConnect();

    const isFilterExist = await Product.exists({ _id: productId });

    if (!isFilterExist) {
      throw new Error('Продукт з таким ідентифікатором не існує');
    }

    await Product.findOneAndDelete({ _id: productId });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error('Some error occurred while product deleting...', error);
    }
  }
}
