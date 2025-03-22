import * as Yup from 'yup';

import { ICreatePackagingFormField } from '@/types';

export const createPackSchema: Yup.ObjectSchema<ICreatePackagingFormField> =
  Yup.object({
    measureTypeUk: Yup.string()
      .min(1, 'Пакування має містити мінімум 1 символи')
      .max(15, 'Пакування може містити макс. 15 символів')
      .required('Обов`язкове поле'),
    measureTypeRu: Yup.string()
      .min(1, 'Пакування має містити мінімум 1 символи')
      .max(15, 'Пакування може містити макс. 15 символів')
      .required('Обов`язкове поле'),
    measureInUk: Yup.string()
      .min(1, 'Міра вимірювання має бути від 1 символів')
      .max(8, 'Міра вимірювання може містити макс. 8 символів')
      .required('Обов`язкове поле'),
    measureInRu: Yup.string()
      .min(1, 'Міра вимірювання має бути від 1 символів')
      .max(8, 'Міра вимірювання може містити макс. 8 символів')
      .required('Обов`язкове поле'),
    measureValue: Yup.number()
      .typeError('Значення пакування має бути числом')
      .min(0, 'Значення пакування може бути від 0')
      .required('Обов`язкове поле'),
    showPricePerUnit: Yup.boolean().default(false),
  });
