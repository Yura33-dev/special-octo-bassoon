import mongoose, { model, models } from 'mongoose';

import { IOrderApi, IProductInOrder } from '@/types';

const productInOrder = new mongoose.Schema<IProductInOrder>(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    packId: { type: mongoose.Schema.Types.ObjectId, ref: 'Packaging' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema<IOrderApi>(
  {
    phone: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    deliveryBy: { type: String, required: true },
    paymentType: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    orderNumber: { type: String, required: true },
    products: [{ type: productInOrder, required: true }],
    postNumber: { type: String, default: null },
    postCode: { type: String, default: null },
    surname: { type: String, default: null },
    fatherName: { type: String, default: null },
    status: {
      type: String,
      enum: ['new', 'processing', 'delivery', 'done'],
      default: 'new',
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Order = models?.Order || model<IOrderApi>('Order', orderSchema);

export default Order;
