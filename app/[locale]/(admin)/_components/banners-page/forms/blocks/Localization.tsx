'use client';

import { FormikProps } from 'formik';
import Image from 'next/image';

import { ISlideForm, ISlideMapped, locale } from '@/types';

import CustomCheckBox from '../../../shared/forms-elements/CustomCheckBox';
import FileUploader from '../../../shared/forms-elements/FileUploader';
import Input from '../../../shared/forms-elements/Input';

interface ILocalizationProps {
  title: string;
  slide: ISlideMapped | undefined;
  locale: locale;
  formik: FormikProps<ISlideForm>;
  isAddForm?: boolean;
}

export default function Localization({
  title,
  slide,
  locale,
  formik,
  isAddForm = false,
}: ILocalizationProps) {
  return (
    <div className='basis-1/2 flex-grow bg-teal-700/20 p-4 rounded-md'>
      <h3 className='text-lg mb-4'>{title}</h3>

      {slide && slide.translatedData[locale].image && !isAddForm && (
        <div className='h-[300px]'>
          <Image
            src={slide.translatedData[locale].image as string}
            width={600}
            height={300}
            className='w-full h-full object-cover rounded-md'
            alt={slide.translatedData[locale].name}
          />
        </div>
      )}

      <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Input
          title='Назва банеру'
          placeholder='Рекламний банер №1'
          name={`translatedData.${locale}.name`}
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.translatedData[locale].name}
          touched={formik.touched}
          errors={formik.errors}
          labelClassName='min-h-[72px]'
        />

        <Input
          title='Посилання'
          placeholder='/catalog/dobryva-i-stymuliatory-rostu'
          name={`translatedData.${locale}.linkTo`}
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.translatedData[locale].linkTo}
          touched={formik.touched}
          errors={formik.errors}
          labelClassName='min-h-[72px]'
        />

        <CustomCheckBox
          title='Активність'
          falseTitle='Ні'
          trueTitle='Так'
          onClick={() =>
            formik.setFieldValue(
              `translatedData.${locale}.visible`,
              !formik.values.translatedData[locale].visible
            )
          }
          value={formik.values.translatedData[locale].visible}
        />

        <Input
          title='Порядок сортування'
          name={`translatedData.${locale}.sortOrder`}
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.translatedData[locale].sortOrder}
          touched={formik.touched}
          errors={formik.errors}
        />

        <FileUploader<ISlideForm>
          labelClassName='mt-6'
          name={`translatedData.${locale}.image`}
          imageUrl={slide?.translatedData[locale].image ?? null}
          onChange={file =>
            formik.setFieldValue(`translatedData.${locale}.image`, file)
          }
          touched={formik.touched}
          errors={formik.errors}
        />
      </div>
    </div>
  );
}
