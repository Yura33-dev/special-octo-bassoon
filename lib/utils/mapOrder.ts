import { IOrderMapped, IOrderPopulated } from '@/types';

export function mapOrder(order: IOrderPopulated): IOrderMapped {
  return {
    id: order._id.toString(),
    phone: order.phone,
    name: order.phone,
    email: order.email,
    deliveryBy: order.deliveryBy,
    paymentType: order.paymentType,
    deliveryTo: order.deliveryTo,
    postNumber: order.postNumber ?? null,
    postCode: order.postCode ?? null,
    surname: order.surname ?? null,
    fatherName: order.fatherName ?? null,
    products: order.products.map(product => ({
      productId: {
        id: product.productId._id.toString(),
        image: product.productId.imgUrl,
        producer: product.productId.producer.translatedData['uk'].title,
        translatedData: {
          uk: {
            name: product.productId.translatedData['uk'].name,
          },
          ru: {
            name: product.productId.translatedData['ru'].name,
          },
        },
      },
      packId: {
        id: product.packId._id.toString(),
        translatedData: {
          uk: {
            type: product.packId.translatedData['uk'].type,
            measureIn: product.packId.translatedData['uk'].measureIn,
            measureValue: product.packId.translatedData['uk'].measureValue,
          },
          ru: {
            type: product.packId.translatedData['ru'].type,
            measureIn: product.packId.translatedData['ru'].measureIn,
            measureValue: product.packId.translatedData['ru'].measureValue,
          },
        },
      },
      quantity: product.quantity,
      price: product.price,
    })),
    totalPrice: order.totalPrice,
    orderNumber: order.orderNumber,
    status: order.status,
    updatedAt: order.updatedAt ? new Date(order.updatedAt).toISOString() : null,
    createdAt: order.createdAt ? new Date(order.createdAt).toISOString() : null,
  };
}
