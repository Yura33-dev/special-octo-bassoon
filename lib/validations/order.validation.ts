import * as Yup from 'yup';

import { IOrderForm } from '@/types';

import {
  DELIVERY_METHOD,
  INCORRECT_EMAIL,
  INCORRECT_PHONE,
  MANDATORY_FIELD,
  MAX_LENGTH_15,
  MAX_LENGTH_24,
  MIN_LENGTH,
  PAYMENT_METHOD,
  PHONE_NUMBER_REGEXP,
} from '../constants';

export const orderSchema: Yup.ObjectSchema<IOrderForm> = Yup.object({
  deliveryBy: Yup.string()
    .oneOf(['np', 'ukr'], DELIVERY_METHOD)
    .required(MANDATORY_FIELD),
  paymentType: Yup.string()
    .oneOf(['bank', 'afterpayment'], PAYMENT_METHOD)
    .required(MANDATORY_FIELD),
  deliveryTo: Yup.string()
    .min(2, MIN_LENGTH)
    .max(24, MAX_LENGTH_24)
    .required(MANDATORY_FIELD),
  name: Yup.string()
    .min(2, MIN_LENGTH)
    .max(15, MAX_LENGTH_15)
    .required(MANDATORY_FIELD),
  phone: Yup.string()
    .matches(PHONE_NUMBER_REGEXP, INCORRECT_PHONE)
    .required(MANDATORY_FIELD),
  email: Yup.string().email(INCORRECT_EMAIL),
  surname: Yup.string().min(2, MIN_LENGTH),
  fatherName: Yup.string().min(2, MIN_LENGTH),
  postNumber: Yup.string().min(2, MIN_LENGTH),
  postCode: Yup.string().min(2, MIN_LENGTH),
  orderNumber: Yup.string().required(MANDATORY_FIELD),
  status: Yup.string()
    .oneOf(['new', 'processing', 'delivery', 'done', 'canceled'])
    .default('new'),
  isArchive: Yup.boolean().default(false),
  totalPrice: Yup.number().min(0),
  createdAt: Yup.string(),

  products: Yup.array().of(
    Yup.object({
      productId: Yup.object({
        id: Yup.string().required(),
        image: Yup.string().required(),
        producer: Yup.object({
          name: Yup.string().required(),
          exchangeRate: Yup.number().required(),
        }).required(),
        translatedData: Yup.object({
          uk: Yup.object({ name: Yup.string().required() }),
          ru: Yup.object({ name: Yup.string().required() }),
        }).required(),
      }).required(),
      packId: Yup.object({
        id: Yup.string().required(),
        translatedData: Yup.object({
          uk: Yup.object({
            type: Yup.string().required(),
            measureIn: Yup.string().required(),
            measureValue: Yup.number().required(),
          }),
          ru: Yup.object({
            type: Yup.string().required(),
            measureIn: Yup.string().required(),
            measureValue: Yup.number().required(),
          }),
        }),
      }).required(),
      price: Yup.number().required(),
      quantity: Yup.number().required(),
    })
  ),
});
