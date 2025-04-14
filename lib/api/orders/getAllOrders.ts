'use server';

import { ORDERS_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapOrder } from '@/lib/utils';
import { Order } from '@/models';
import { IOrderMapped, IOrderPopulated } from '@/types';

export async function getAllOrders(
  filter: Record<string, string> | object = {}
): Promise<Array<IOrderMapped> | []> {
  try {
    await dbConnect();

    const orders = await Order.find(filter)
      .populate('products')
      .lean<Array<IOrderPopulated>>();

    return orders
      .map(order => mapOrder(order))
      .toSorted((a, b) => {
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
  } catch (error) {
    console.error(`Error: ${ORDERS_FETCH_FAILED}. ${error}`);
    return [];
  }
}
