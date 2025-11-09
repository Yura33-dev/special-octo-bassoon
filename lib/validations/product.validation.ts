import * as Yup from 'yup';

import { IProductForm } from '@/types';

import {
  ALLOW_IMAGE_EXT,
  ALLOW_IMAGE_EXT_ARRAY,
  ATLEAST_ONE_PRODUCER,
  DEFAULT_PACKAGE_AT_LEAST,
  FILE_NAME_REGEXP,
  LARGE_IMAGE_SIZE,
  LATIN_FILE_NAME,
  MANDATORY_FIELD,
  MAX_LENGTH_50,
  MIN_ARRAY_LENGTH_1,
  MIN_LENGTH,
  ONLY_NUMBERS,
  ONLY_POSITIVE_NUMBERS,
  SPECIFY_BOTH_CATEGORIES,
} from '../constants';

export const validationProductSchema: Yup.ObjectSchema<IProductForm> =
  Yup.object({
    translatedData: Yup.object().shape({
      uk: Yup.object().shape({
        name: Yup.string()
          .min(2, MIN_LENGTH)
          .max(50, MAX_LENGTH_50)
          .required(MANDATORY_FIELD),
        slug: Yup.string().required(MANDATORY_FIELD),
        description: Yup.string().nullable(),
        country: Yup.string().nullable().default(null),
        meta: Yup.object()
          .shape({
            title: Yup.string().required(MANDATORY_FIELD),
            description: Yup.string().required(MANDATORY_FIELD),
            keywords: Yup.string().nullable(),
          })
          .required(),
      }),
      ru: Yup.object().shape({
        name: Yup.string()
          .min(2, MIN_LENGTH)
          .max(50, MAX_LENGTH_50)
          .required(MANDATORY_FIELD),
        slug: Yup.string().required(MANDATORY_FIELD),
        description: Yup.string().nullable(),
        country: Yup.string().nullable().default(null),
        meta: Yup.object()
          .shape({
            title: Yup.string().required(MANDATORY_FIELD),
            description: Yup.string().required(MANDATORY_FIELD),
            keywords: Yup.string().nullable(),
          })
          .required(),
      }),
    }),

    packaging: Yup.object().shape({
      default: Yup.string().required(DEFAULT_PACKAGE_AT_LEAST),
      items: Yup.array()
        .of(
          Yup.object({
            packId: Yup.string().required(MANDATORY_FIELD),
            quantity: Yup.number()
              .min(0, ONLY_POSITIVE_NUMBERS)
              .typeError(ONLY_NUMBERS)
              .default(null)
              .nullable(),
            price: Yup.number()
              .positive(ONLY_POSITIVE_NUMBERS)
              .required(MANDATORY_FIELD)
              .typeError(ONLY_NUMBERS),
          })
        )
        .min(1, MIN_ARRAY_LENGTH_1)
        .required(),
    }),

    categories: Yup.array()
      .of(Yup.string().required(MANDATORY_FIELD))
      .min(2, SPECIFY_BOTH_CATEGORIES)
      .required(),

    visible: Yup.boolean().default(true),

    imgUrl: Yup.mixed<File>()
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

    filters: Yup.array()
      .of(
        Yup.object({
          id: Yup.string().required(),
          filter: Yup.string().required(MANDATORY_FIELD),
          values: Yup.array()
            .of(Yup.string().required())
            .min(1, MANDATORY_FIELD)
            .required(MANDATORY_FIELD),
        })
      )
      .default([]),

    labels: Yup.array().of(Yup.string().required()).default([]),

    producer: Yup.string().required(ATLEAST_ONE_PRODUCER),
  });
