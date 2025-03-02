'use server';

import { ORDERS_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Order } from '@/models';
import { IOrder, IOrderApi, locale } from '@/types';

export async function getAllOrders(
  locale: locale
): Promise<Array<IOrder> | []> {
  try {
    await dbConnect();

    const orders = await Order.find({})
      .populate({ path: 'products.productId', model: 'Product' })
      .populate({ path: 'products.packId', model: 'Packaging' })
      .lean<Array<IOrderApi>>();

    if (orders.length <= 0) return [];

    const transformedOrders = orders
      .map(order => ({
        id: order._id.toString(),
        name: order.name,
        surname: order.surname || null,
        fatherName: order.fatherName || null,
        email: order.email,
        phone: order.phone,
        deliveryBy: order.deliveryBy,
        deliveryTo: order.deliveryTo,
        paymentType: order.paymentType,
        postNumber: order.postNumber || null,
        postCode: order.postCode || null,
        totalPrice: order.totalPrice,
        orderNumber: order.orderNumber,
        status: order.status,
        updatedAt: new Date(order.updatedAt),
        createdAt: new Date(order.createdAt),
        products: order.products.map(product => ({
          product: {
            id: product.productId._id.toString(),
            image: product.productId.imgUrl,
            name: product.productId.translatedData[locale].name,
            producer: product.productId.producer,
          },
          pack: {
            id: product.packId._id.toString(),
            type: product.packId.translatedData[locale].type,
            measureValue: product.packId.translatedData[locale].measureValue,
            measureIn: product.packId.translatedData[locale].measureIn,
          },
          quantity: product.quantity,
          price: product.price,
        })),
      }))
      .toSorted((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return transformedOrders;
  } catch (error) {
    console.error(`Error: ${ORDERS_FETCH_FAILED}. ${error}`);
    return [];
  }
}
