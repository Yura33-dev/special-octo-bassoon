'use server';

import dbConnect from '@/lib/db';
import { mapOrder } from '@/lib/utils';
import { Order } from '@/models';
import { IOrderMapped, IOrderPopulated } from '@/types';

export async function getOrderById(
  orderId: string
): Promise<IOrderMapped | null> {
  try {
    await dbConnect();

    const order = await Order.findOne({
      _id: orderId,
    })
      .populate({
        path: 'products.productId',
        populate: {
          path: 'producer',
        },
      })
      .populate('products.packId')
      .lean<IOrderPopulated>();

    if (!order) {
      return null;
    }

    return mapOrder(order);
  } catch (error) {
    console.error(`Помилка при завантажені замовлення. ${error}`);
    return null;
  }
}
