import { ObjectId } from 'mongoose';

export interface IOrderApi extends Document {
  _id: ObjectId;
  phone: string;
  name: string;
  email: string;
  deliveryBy: string;
  paymentType: string;
  deliveryTo: string;
  postNumber?: string | null;
  postCode?: string | null;
  surname?: string | null;
  fatherName?: string | null;
  products: Array<IProductInOrder>;
  totalPrice: number;
  orderNumber: string;
  status: 'new' | 'processing' | 'delivery' | 'done';
  updatedAt: Date;
  createdAt: Date;
}

export interface IProductInOrder {
  productId: ObjectId;
  packId: ObjectId;
  quantity: number;
  price: number;
}
