'use client';

import { FormikProps } from 'formik';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { slugify } from 'transliteration';
import 'react-quill-new/dist/quill.snow.css';

import { IProductForm } from '@/types';

import Input from '../../../shared/forms-elements/Input';
import TextArea from '../../../shared/forms-elements/TextArea';

interface ILocalizationProps {
  locale: 'uk' | 'ru';
  title: string;
  formik: FormikProps<IProductForm>;
  productDescription: string;
  setProductDescription: Dispatch<SetStateAction<string>>;
}

export default function Localization({
  title,
  formik,
  productDescription,
  setProductDescription,
  locale,
}: ILocalizationProps) {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill-new'), { ssr: false }),
    []
  );

  return (
    <div className='flex flex-col gap-4 p-4 bg-gray-200/60 rounded-md'>
      <h2 className='text-lg font-semibold md:mb-4'>{title}</h2>

      <div className='flex flex-col gap-6'>
        <div className='grid grid-cols-1 auto-rows-[minmax(72px,auto)] sm:grid-cols-2 gap-4 sm:gap-2'>
          <Input
            title='Назва'
            name={`translatedData.${locale}.name`}
            type='text'
            onChange={e => {
              const productName = e.target.value;
              formik.setFieldValue(
                `translatedData.${locale}.name`,
                productName
              );
              formik.setFieldValue(
                `translatedData.${locale}.slug`,
                slugify(productName, { lowercase: true })
              );
              formik.setFieldValue(
                `translatedData.${locale}.meta.title`,
                productName
              );
            }}
            onBlur={formik.handleBlur}
            value={formik.values.translatedData[locale].name}
            touched={formik.touched}
            errors={formik.errors}
            className='sm:max-w-72'
          />

          <Input
            title='Ідентифікатор'
            name={`translatedData.${locale}.slug`}
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.translatedData[locale].slug}
            touched={formik.touched}
            errors={formik.errors}
            className='sm:max-w-72'
          />
        </div>

        <div>
          <span className='text-sm font-semibold block mb-2'>Опис</span>
          <ReactQuill
            theme='snow'
            value={productDescription}
            onChange={setProductDescription}
          />
        </div>

        <Input
          title='Країна походження'
          name={`translatedData.${locale}.country`}
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.translatedData[locale].country}
          touched={formik.touched}
          errors={formik.errors}
          className='sm:max-w-72'
          labelClassName='min-h-[72px]'
        />

        <div>
          <h3 className='text-base font-semibold mb-2'>SEO-налаштування</h3>
          <div className='grid grid-cols-1 auto-rows-[minmax(72px,auto)] gap-4 sm:gap-2'>
            <TextArea
              title='Заголовок товару'
              name={`translatedData.${locale}.meta.title`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.translatedData[locale].meta.title}
              touched={formik.touched}
              errors={formik.errors}
              className='min-h-16'
            />

            <TextArea
              title='Ключові слова'
              name={`translatedData.${locale}.meta.keywords`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.translatedData[locale].meta.keywords ?? ''}
              touched={formik.touched}
              errors={formik.errors}
              className='min-h-16'
            />

            <TextArea
              title='Опис товару'
              name={`translatedData.${locale}.meta.description`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.translatedData[locale].meta.description}
              touched={formik.touched}
              errors={formik.errors}
              className='min-h-16'
              labelClassName='col-span-full min-h-[108px]'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
