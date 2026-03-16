'use server';

import ShortUniqueId from 'short-unique-id';

import { redirect } from '@/i18n/routing';
import {
  EMAIL_REGEXP,
  INCORRECT_EMAIL,
  INCORRECT_NAME,
  INCORRECT_PHONE,
  INCORRECT_POST,
  MANDATORY_FIELD,
  PHONE_NUMBER_REGEXP,
} from '@/lib/constants';
import { Order } from '@/models';
import { IOrderApi, IOrderData, IOrderState } from '@/types';

export async function submitOrder(
  _: IOrderState,
  formData: FormData
): Promise<IOrderState> {
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
    email: parsedData.customerEmail,
    deliveryTo: parsedData.city,
    deliveryBy: parsedData.delivery,
    postNumber: parsedData.postNumber || null,
    paymentType: parsedData.payment,
    totalPrice: parsedData.totalPrice,
    orderNumber: orderId,
    products: parsedData.products,
  };

  const { orderNumber }: IOrderApi = await Order.create(orderObject);
  redirect({
    href: { pathname: '/checkout/success', query: { order: orderNumber } },
    locale: parsedData.locale,
  });

  return { success: true, errors: {}, orderNumber };
}

function validateData(data: IOrderData) {
  const errors: Record<string, string> = {};

  const requiredFields: Array<keyof IOrderData> = [
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

  if (data.customerEmail && !EMAIL_REGEXP.test(data.customerEmail)) {
    errors.customerEmail = INCORRECT_EMAIL;
  }

  if (data.customerPhone && !PHONE_NUMBER_REGEXP.test(data.customerPhone)) {
    errors.customerPhone = INCORRECT_PHONE;
  }

  if (data.customerName && data.customerName.length < 2) {
    errors.customerName = INCORRECT_NAME;
  }

  if (!data.postNumber) {
    errors.postNumber = INCORRECT_POST;
  }

  return errors;
}

function parseFormData(formData: FormData): IOrderData {
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

  return data as unknown as IOrderData;
}
