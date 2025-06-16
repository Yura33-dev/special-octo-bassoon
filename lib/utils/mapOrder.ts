import { IOrderMapped, IOrderPopulated } from '@/types';

export function mapOrder(order: IOrderPopulated): IOrderMapped {
  return {
    id: order._id.toString(),
    phone: order.phone,
    name: order.name,
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
        producer: {
          name: product.productId.producer.translatedData['uk'].title,
          exchangeRate: product.productId.producer.exchangeRate ?? 0,
        },
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
            type: product.packId.translatedData['uk'].type ?? 'N/A unknown',
            measureIn:
              product.packId.translatedData['uk'].measureIn ?? 'N/A unknown',
            measureValue:
              product.packId.translatedData['uk'].measureValue ?? 'N/A unknown',
          },
          ru: {
            type: product.packId.translatedData['ru'].type ?? 'N/A unknown',
            measureIn:
              product.packId.translatedData['ru'].measureIn ?? 'N/A unknown',
            measureValue:
              product.packId.translatedData['ru'].measureValue ?? 'N/A unknown',
          },
        },
      },
      quantity: product.quantity,
      price: product.price,
    })),
    totalPrice: order.totalPrice,
    orderNumber: order.orderNumber,
    status: order.status,
    isArchive: order.isArchive ?? false,
    updatedAt: order.updatedAt ? new Date(order.updatedAt).toISOString() : null,
    createdAt: order.createdAt ? new Date(order.createdAt).toISOString() : null,
  };
}
