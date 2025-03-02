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
  products: Array<IProductInOrderApi>;
  totalPrice: number;
  orderNumber: string;
  status: 'new' | 'processing' | 'delivery' | 'done' | 'canceled';
  updatedAt: Date;
  createdAt: Date;
}

export interface IOrder {
  id: string;
  phone: string;
  name: string;
  email: string;
  deliveryBy: string;
  paymentType: string;
  deliveryTo: string;
  postNumber: string | null;
  postCode: string | null;
  surname: string | null;
  fatherName: string | null;
  products: Array<IProductInOrder>;
  totalPrice: number;
  orderNumber: string;
  status: 'new' | 'processing' | 'delivery' | 'done' | 'canceled';
  updatedAt: Date;
  createdAt: Date;
}

export interface IProductInOrderApi {
  productId: {
    _id: ObjectId;
    imgUrl: string;
    producer: string;
    translatedData: Record<string, { name: string }>;
    name: string;
  };
  packId: {
    _id: ObjectId;
    translatedData: Record<
      string,
      { type: string; measureValue: number; measureIn: string }
    >;
  };
  quantity: number;
  price: number;
}

export interface IProductInOrder {
  product: {
    id: string;
    image: string;
    name: string;
    producer: string;
  };
  pack: {
    id: string;
    type: string;
    measureValue: number;
    measureIn: string;
  };
  quantity: number;
  price: number;
}
