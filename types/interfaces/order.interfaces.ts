import { ObjectId } from 'mongoose';

import { IPackagingPopulated } from './packaging.interfaces';
import { IProductPopulated } from './product.interfaces';

export interface IOrderApi extends Document {
  _id: ObjectId;
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
  products: Array<IProductInOrderApi>;
  totalPrice: number;
  orderNumber: string;
  status: OrderStatus;
  isArchive: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export interface IProductInOrderApi {
  productId: ObjectId;
  packId: ObjectId;
  quantity: number;
  price: number;
}

export interface IOrderPopulated {
  _id: ObjectId;
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
  products: Array<IProductInOrderPopulated>;
  totalPrice: number;
  orderNumber: string;
  status: OrderStatus;
  isArchive: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export interface IProductInOrderPopulated {
  productId: IProductPopulated;
  packId: IPackagingPopulated;
  quantity: number;
  price: number;
}

export interface IOrderMapped {
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
  products: Array<IProductInOrderMapped>;
  totalPrice: number;
  orderNumber: string;
  status: OrderStatus;
  isArchive: boolean;
  updatedAt: string | null;
  createdAt: string | null;
}

export interface IProductInOrderMapped {
  productId: {
    id: string;
    image: string;
    producer: {
      name: string;
      exchangeRate: number;
    };
    translatedData: Record<string, { name: string }>;
  };
  packId: {
    id: string;
    translatedData: Record<
      string,
      { type: string; measureIn: string; measureValue: number }
    >;
  };
  quantity: number;
  price: number;
}

export type OrderStatus =
  | 'new'
  | 'processing'
  | 'delivery'
  | 'done'
  | 'canceled';

export interface IOrderData {
  delivery: string;
  payment: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  city: string;
  products: Array<IProductInOrderApi>;
  customerLastName: string;
  customerFatherName: string;
  postNumber: string;
  postCode: string;
  totalPrice: number;
  orderId?: string;
  locale: string;
}

export interface IOrderState {
  success: boolean;
  errors: Partial<Record<keyof IOrderData, string>>;
  orderNumber: string | null;
}

export interface IOrderForm {
  deliveryBy: string;
  paymentType: string;
  name: string;
  phone: string;
  email?: string;
  deliveryTo: string;
  products?: Array<IProductInOrderMapped>;
  surname?: string;
  fatherName?: string;
  postNumber?: string;
  postCode?: string;
  totalPrice?: number;
  orderNumber: string | null;
  status: OrderStatus;
  isArchive: boolean;
  createdAt?: string;
}
