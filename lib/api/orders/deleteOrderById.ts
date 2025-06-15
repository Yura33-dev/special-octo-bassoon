'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Order } from '@/models';
import { IOrderPopulated } from '@/types';

export async function deleteOrderById(orderId: string) {
  try {
    await dbConnect();

    const isOrderExist = await Order.exists({ _id: orderId });

    if (!isOrderExist) {
      throw new Error('Замовлення з таким ідентифікатором не існує');
    }

    await Order.findOneAndDelete({
      _id: orderId,
    }).lean<IOrderPopulated>();

    revalidatePath('/*/dashboard/orders/archive');
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error('Some error occured while order deleting...', error);
      throw new Error('Сталася помилка при видаленні замовлення');
    }
  }
}
