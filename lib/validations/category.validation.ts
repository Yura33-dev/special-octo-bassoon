import * as Yup from 'yup';

import { ICategoryForm } from '@/types';

import {
  ALLOW_IMAGE_EXT,
  ALLOW_IMAGE_EXT_ARRAY,
  FILE_NAME_REGEXP,
  LARGE_IMAGE_SIZE,
  LATIN_FILE_NAME,
  MANDATORY_FIELD,
  MAX_LENGTH_30,
  MAX_LENGTH_50,
  MIN_LENGTH,
  SORT_ORDER_GT_ZERO,
  SORT_ORDER_INTEGER,
  SORT_ORDER_NUMBER,
} from '../constants';

export const categoryValidationSchema: Yup.ObjectSchema<ICategoryForm> =
  Yup.object({
    name: Yup.object({
      uk: Yup.string()
        .min(2, MIN_LENGTH)
        .max(30, MAX_LENGTH_30)
        .required(MANDATORY_FIELD),
      ru: Yup.string().required(MANDATORY_FIELD),
    }),
    slug: Yup.object({
      uk: Yup.string().min(2, MIN_LENGTH).required(MANDATORY_FIELD),
      ru: Yup.string().min(2, MIN_LENGTH).required(MANDATORY_FIELD),
    }),
    main: Yup.boolean().required(MANDATORY_FIELD),
    sortOrder: Yup.number()
      .typeError(SORT_ORDER_NUMBER)
      .integer(SORT_ORDER_INTEGER)
      .min(0, SORT_ORDER_GT_ZERO)
      .required(MANDATORY_FIELD),
    featured: Yup.boolean().default(false),
    visible: Yup.boolean().default(true),
    meta: Yup.object({
      uk: Yup.object({
        title: Yup.string()
          .min(2, MIN_LENGTH)
          .max(50, MAX_LENGTH_50)
          .nullable()
          .default(null),
        description: Yup.string().min(2, MIN_LENGTH).nullable().default(null),
        keywords: Yup.string().min(2, MIN_LENGTH).nullable().default(null),
        seoText: Yup.string().nullable().default(null),
      }),
      ru: Yup.object({
        title: Yup.string()
          .min(2, MIN_LENGTH)
          .max(50, MAX_LENGTH_50)
          .nullable()
          .default(null),
        description: Yup.string().min(2, MIN_LENGTH).nullable().default(null),
        keywords: Yup.string().min(2, MIN_LENGTH).nullable().default(null),
        seoText: Yup.string().nullable().default(null),
      }),
    }),
    childCategories: Yup.array().of(Yup.string().required()).default([]),
    parentCategories: Yup.array().of(Yup.string().required()).default([]),
    image: Yup.mixed<File>()
      .test('fileType', ALLOW_IMAGE_EXT, value => {
        if (!value || typeof value.name !== 'string') return true;
        return ALLOW_IMAGE_EXT_ARRAY.includes(value.type);
      })
      .test('fileSize', LARGE_IMAGE_SIZE, value => {
        if (!value || typeof value.name !== 'string') return true;
        return value.size <= 5 * 1024 * 1024;
      })
      .test('fileName', LATIN_FILE_NAME, value => {
        if (!value || typeof value.name !== 'string') return true;

        const fileNameWithoutExtension = value.name
          .split('.')
          .slice(0, -1)
          .join('.');

        return FILE_NAME_REGEXP.test(fileNameWithoutExtension);
      })
      .nullable()
      .default(null),
  });
