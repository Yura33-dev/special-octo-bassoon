import * as Yup from 'yup';

import { ICreateCategoryFormField, IEditCategoryFormField } from '@/types';

import {
  ALLOW_IMAGE_EXT,
  ALLOW_IMAGE_EXT_ARRAY,
  FILE_NAME_REGEXP,
  LARGE_IMAGE_SIZE,
  LATIN_FILE_NAME,
} from '../constants';

export const editCategorySchema: Yup.ObjectSchema<IEditCategoryFormField> =
  Yup.object({
    nameUk: Yup.string()
      .min(3, 'Категорія має містити мінімум 3 символи')
      .max(29, 'Категорія може містити макс. 29 символів')
      .required('Обов`язкове поле'),
    nameRu: Yup.string()
      .min(3, 'Категорія має містити мінімум 3 символи')
      .max(29, 'Категорія може містити макс. 29 символів')
      .required('Обов`язкове поле'),
    slugUk: Yup.string()
      .min(3, 'Посилання категорії має містити мінімум 3 символи')
      .matches(
        /^[a-zA-Z0-9-]+$/,
        'Тільки латиниця, цифри та дефіс без пробілів'
      )
      .required('Обов`язкове поле'),
    slugRu: Yup.string()
      .min(3, 'Посилання категорії має містити мінімум 3 символи')
      .matches(
        /^[a-zA-Z0-9-]+$/,
        'Тільки латиниця, цифри та дефіс без пробілів'
      )
      .required('Обов`язкове поле'),
    sortOrder: Yup.number()
      .typeError('Порядок сортування має бути числом')
      .integer('Порядок сортування може бути тільки цілим числом')
      .min(0, 'Порядок сортування може бути від 0')
      .required('Обов`язкове поле'),
    featured: Yup.boolean().default(false),
    visible: Yup.boolean().default(true),
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

export const createCategorySchema: Yup.ObjectSchema<ICreateCategoryFormField> =
  Yup.object({
    nameUk: Yup.string()
      .min(3, 'Категорія має містити мінімум 3 символи')
      .max(29, 'Категорія може містити макс. 29 символів')
      .required('Обов`язкове поле'),
    nameRu: Yup.string()
      .min(3, 'Категорія має містити мінімум 3 символи')
      .max(29, 'Категорія може містити макс. 29 символів')
      .required('Обов`язкове поле'),
    slugUk: Yup.string()
      .min(3, 'Посилання категорії має містити мінімум 3 символи')
      .matches(
        /^[a-zA-Z0-9-]+$/,
        'Тільки латиниця, цифри та дефіс без пробілів'
      )
      .required('Обов`язкове поле'),
    slugRu: Yup.string()
      .min(3, 'Посилання категорії має містити мінімум 3 символи')
      .matches(
        /^[a-zA-Z0-9-]+$/,
        'Тільки латиниця, цифри та дефіс без пробілів'
      )
      .required('Обов`язкове поле'),
    sortOrder: Yup.number()
      .typeError('Порядок сортування має бути числом')
      .integer('Порядок сортування може бути тільки цілим числом')
      .min(0, 'Порядок сортування може бути від 0')
      .required('Обов`язкове поле'),
    featured: Yup.boolean().default(false),
    visible: Yup.boolean().default(true),
    main: Yup.boolean().default(true),
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
