import * as Yup from 'yup';

import { ICreateCategoryFormField, IEditCategoryFormField } from '@/types';

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
      .test(
        'fileType',
        'Можливе завантаження лише картинок (JPG, JPEG, PNG, WEBP)',
        value => {
          if (!value) return true;

          if (value instanceof File) {
            return [
              'image/jpeg',
              'image/jpg',
              'image/png',
              'image/webp',
            ].includes(value.type);
          }

          if (typeof value === 'string') {
            return true;
          }

          return false;
        }
      )
      .test('fileSize', 'Зображення завелике (макс. 5 MB)', value => {
        if (!value) return true;
        if (value instanceof File) {
          return value.size <= 5 * 1024 * 1024;
        }

        if (typeof value === 'string') {
          return true;
        }

        return false;
      })
      .test('fileName', 'Назва файлу повинна бути латиницею', value => {
        if (!value) return true;

        if (value instanceof File) {
          const fileNameWithoutExtension = value.name
            .split('.')
            .slice(0, -1)
            .join('.');

          return /^[A-Za-z0-9 _-]+$/.test(fileNameWithoutExtension);
        }

        if (typeof value === 'string') {
          return true;
        }

        return false;
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
      .test(
        'fileType',
        'Можливе завантаження лише картинок (JPG, JPEG, PNG, WEBP)',
        value => {
          if (!value) return true;
          return [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/webp',
          ].includes(value.type);
        }
      )
      .test('fileSize', 'Зображення завелике (макс. 5 MB)', value => {
        if (!value) return true;
        return value.size <= 5 * 1024 * 1024;
      })
      .test('fileName', 'Назва файлу повинна бути латиницею', value => {
        if (!value) return true;
        const fileNameWithoutExtension = value.name
          .split('.')
          .slice(0, -1)
          .join('.');

        return /^[A-Za-z0-9 _-]+$/.test(fileNameWithoutExtension);
      })
      .nullable()
      .default(null),
  });
