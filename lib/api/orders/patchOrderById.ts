'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Order } from '@/models';
import { IOrderApi, IOrderForm } from '@/types';

export async function patchOrderById(
  orderId: string,
  data: Partial<IOrderForm>
): Promise<IOrderApi | null> {
  try {
    await dbConnect();

    const result: IOrderApi | null = await Order.findOneAndUpdate(
      { _id: orderId },
      data,
      { new: true }
    );

    if (!result) throw new Error('Замовлення не знайдено для редагування');

    revalidatePath('/*/dashboard/orders');
    return JSON.parse(JSON.stringify(result));
  } catch (error: unknown) {
    console.error('Some error occured while order patching...', error);
    throw new Error('Сталася помилка при оновлені замовлення');
  }
}
