'use server';

import ShortUniqueId from 'short-unique-id';

import {
  INCORRECT_EMAIL,
  INCORRECT_FATHERNAME,
  INCORRECT_NAME,
  INCORRECT_PHONE,
  INCORRECT_POST,
  INCORRECT_SURNAME,
  INCORRECT_ZIP,
  MANDATORY_FIELD,
} from '@/lib/constants';
import { Order } from '@/models';
import { IOrderApi, IProductInOrderApi } from '@/types';

interface OrderData {
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
}

export type OrderState = {
  success: boolean;
  errors: Partial<Record<keyof OrderData, string>>;
  orderNumber: string | null;
};

export async function submitOrder(
  _: OrderState,
  formData: FormData
): Promise<OrderState> {
  const parsedData = parseFormData(formData);

  const errors = validateData(parsedData);

  if (Object.keys(errors).length > 0) {
    return { errors, success: false, orderNumber: null };
  }

  const uid = new ShortUniqueId({ length: 6, dictionary: 'alphanum_upper' });
  const orderId = `INV-${uid.rnd()}`;

  const orderObject: Partial<IOrderApi> = {
    phone: parsedData.customerPhone,
    name: parsedData.customerName,
    surname: parsedData.customerLastName || null,
    fatherName: parsedData.customerFatherName || null,
    email: parsedData.customerEmail,
    deliveryTo: parsedData.city,
    deliveryBy: parsedData.delivery,
    postNumber: parsedData.postNumber || null,
    postCode: parsedData.postCode || null,
    paymentType: parsedData.payment,
    totalPrice: parsedData.totalPrice,
    orderNumber: orderId,
    products: parsedData.products,
  };

  const { orderNumber }: IOrderApi = await Order.create(orderObject);

  return { success: true, errors: {}, orderNumber };
}

function validateData(data: OrderData) {
  const errors: Record<string, string> = {};

  const requiredFields: Array<keyof OrderData> = [
    'delivery',
    'payment',
    'customerName',
    'customerPhone',
    'customerEmail',
    'city',
  ];

  requiredFields.forEach(field => {
    if (!data[field]) {
      errors[field] = MANDATORY_FIELD;
    }
  });

  if (
    data.customerEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customerEmail)
  ) {
    errors.customerEmail = INCORRECT_EMAIL;
  }

  if (data.customerPhone && !/^\d{10,}$/.test(data.customerPhone)) {
    errors.customerPhone = INCORRECT_PHONE;
  }

  if (data.customerName && data.customerName.length < 2) {
    errors.customerName = INCORRECT_NAME;
  }

  if (data.delivery === 'np') {
    if (!data.postNumber) {
      errors.postNumber = INCORRECT_POST;
    }
  } else if (data.delivery === 'ukr') {
    if (!data.customerLastName || data.customerLastName.length < 2) {
      errors.customerLastName = INCORRECT_SURNAME;
    }
    if (!data.customerFatherName || data.customerFatherName.length < 2) {
      errors.customerFatherName = INCORRECT_FATHERNAME;
    }
    if (!data.postCode || data.postCode.length < 2) {
      errors.postCode = INCORRECT_ZIP;
    }
  }
  return errors;
}

function parseFormData(formData: FormData): OrderData {
  const data: Record<string, string | number | object[]> = {};

  formData.forEach((value, key) => {
    if (value.toString().length > 0) {
      if (key === 'products') {
        try {
          data[key] = JSON.parse(value as string);
        } catch {
          data[key] = [];
        }
      } else if (key === 'totalPrice') {
        data[key] = Number(value);
      } else {
        data[key] = value.toString().trim();
      }
    }
  });

  return data as unknown as OrderData;
}
