import * as Yup from 'yup';

import { ISlideForm } from '@/types';

import {
  MANDATORY_FIELD,
  MAX_LENGTH_15,
  MIN_LENGTH,
  SORT_ORDER_GT_ZERO,
  SORT_ORDER_INTEGER,
  SORT_ORDER_NUMBER,
} from '../constants';

export const bannerValidationSchema: Yup.ObjectSchema<ISlideForm> = Yup.object({
  translatedData: Yup.object().shape({
    uk: Yup.object().shape({
      linkTo: Yup.string().nullable().default(null),
      image: Yup.string().nullable().default(null),
      name: Yup.string()
        .min(2, MIN_LENGTH)
        .max(15, MAX_LENGTH_15)
        .required(MANDATORY_FIELD),
      sortOrder: Yup.number()
        .typeError(SORT_ORDER_NUMBER)
        .integer(SORT_ORDER_INTEGER)
        .min(0, SORT_ORDER_GT_ZERO)
        .required(MANDATORY_FIELD),
      visible: Yup.boolean().default(true),
    }),
    ru: Yup.object().shape({
      linkTo: Yup.string().nullable().default(null),
      image: Yup.string().nullable().default(null),
      name: Yup.string()
        .min(2, MIN_LENGTH)
        .max(15, MAX_LENGTH_15)
        .required(MANDATORY_FIELD),
      sortOrder: Yup.number()
        .typeError(SORT_ORDER_NUMBER)
        .integer(SORT_ORDER_INTEGER)
        .min(0, SORT_ORDER_GT_ZERO)
        .required(MANDATORY_FIELD),
      visible: Yup.boolean().default(true),
    }),
  }),
});
