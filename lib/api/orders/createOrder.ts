'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Order } from '@/models';
import { IOrderApi, IOrderForm } from '@/types';

export async function createOrder(
  data: IOrderForm
): Promise<IOrderApi | undefined> {
  if (!data.products || !data.totalPrice) {
    throw new Error('Помилка збереження замовлення');
  }

  if (data.products.length < 1) {
    throw new Error('Додайте хоча б один товар в замовлення');
  }

  if (data.totalPrice < 1) {
    throw new Error('Помилка збереження замовлення');
  }

  try {
    await dbConnect();

    const isFilterExist = await Order.findOne({
      orderNumber: data.orderNumber,
    });

    if (isFilterExist) {
      throw new Error('Замовлення з таким ідентифікатором вже існує');
    }

    const result: IOrderApi = await Order.create(data);

    if (!result) {
      throw new Error('Виникла помилка при збережені замовлення');
    }

    revalidatePath('/*/dashboard/orders');
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error('Some error occurred while filter creating...', error);
    }
  }
}
