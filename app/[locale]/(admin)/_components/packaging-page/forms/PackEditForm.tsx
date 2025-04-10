'use client';

import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/routing';
import { patchPackagingById } from '@/lib/api';
import { DELETE_PACKAGING_ID } from '@/lib/constants';
import { createPackSchema as editPackSchema } from '@/lib/validations';
import { useModalStore } from '@/providers';
import {
  ICreatePackagingFormField as IEditPackagingFormField,
  ICreatePackagingStructured as IEditPackagingStructured,
  IPackagingMapped,
} from '@/types';

import CustomCheckBox from '../../shared/forms-elements/CustomCheckBox';
import DeleteButton from '../../shared/forms-elements/DeleteButton';
import Input from '../../shared/forms-elements/Input';
import SubmitButton from '../../shared/forms-elements/SubmitButton';

interface IPackEditFormProps {
  packaging: IPackagingMapped;
}

export default function PackEditForm({ packaging }: IPackEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const openModal = useModalStore(state => state.openModal);

  const router = useRouter();

  const initialValues: IEditPackagingFormField = {
    measureTypeUk: packaging?.translatedData['uk']?.type ?? '',
    measureTypeRu: packaging?.translatedData['ru']?.type ?? '',
    measureInUk: packaging?.translatedData['uk']?.measureIn ?? '',
    measureInRu: packaging?.translatedData['ru']?.measureIn ?? '',
    measureValue: packaging?.translatedData['uk']?.measureValue ?? 0,
    showPricePerUnit: packaging?.showPricePerUnit ?? false,
  };

  const onSubmit = async (values: IEditPackagingFormField) => {
    setIsSubmitting(true);

    const dataToSave: IEditPackagingStructured = {
      translatedData: {
        uk: {
          type: values.measureTypeUk,
          measureIn: values.measureInUk,
          measureValue: values.measureValue,
        },
        ru: {
          type: values.measureTypeRu,
          measureIn: values.measureInRu,
          measureValue: values.measureValue,
        },
      },
      showPricePerUnit: values.showPricePerUnit,
    };

    try {
      await patchPackagingById(packaging.id, dataToSave);
      toast.success('Пакування успішно оновлено!');
      setTimeout(() => router.back(), 210);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Сталася помилка при оновленні пакування');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteButton = () => {
    openModal(DELETE_PACKAGING_ID);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: editPackSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Localization */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className='flex flex-col gap-4 p-4 bg-gray-200 rounded-md'>
          <h2 className='text-lg font-semibold md:mb-4'>
            Українська локалізація
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2'>
            <Input
              title='Назва'
              placeholder='Проф.пакет / Каністра'
              name='measureTypeUk'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.measureTypeUk}
              touched={formik.touched}
              errors={formik.errors}
              className='sm:max-w-72'
            />

            <Input
              title='Одиниця вимірювання'
              placeholder='насінин / кг / г / л'
              name='measureInUk'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.measureInUk}
              touched={formik.touched}
              errors={formik.errors}
              className='sm:max-w-72'
            />
          </div>
        </div>

        <div className='flex flex-col gap-4 p-4 bg-gray-200 rounded-md'>
          <h2 className='text-lg font-semibold md:mb-4'>
            Російська локалізація
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2'>
            <Input
              title='Назва'
              placeholder='Проф.пакет / Канистра'
              name='measureTypeRu'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.measureTypeRu}
              touched={formik.touched}
              errors={formik.errors}
              className='sm:max-w-72'
            />

            <Input
              title='Одиниця вимірювання'
              placeholder='насінин / кг / г / л'
              name='measureInRu'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.measureInRu}
              touched={formik.touched}
              errors={formik.errors}
              className='sm:max-w-72'
            />
          </div>
        </div>
      </div>

      {/* pack value, price per unit  */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='p-4 bg-gray-200 mt-5 rounded-md basis-full md:basis-1/2'>
          <div className='flex flex-col items-start gap-6 lg:gap-8'>
            <Input
              title='Значення пакування'
              placeholder='10000 / 3 / 0.5'
              name='measureValue'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.measureValue as unknown as string}
              touched={formik.touched}
              errors={formik.errors}
              className='sm:max-w-72'
            />
          </div>
        </div>

        <div className='p-4 bg-gray-200 mt-5 rounded-md basis-full md:basis-1/2'>
          <div className='flex flex-col items-start gap-6 lg:gap-8'>
            <CustomCheckBox
              title='Показувати ціну за одиницю'
              falseTitle='Ні'
              trueTitle='Так'
              onClick={() =>
                formik.setFieldValue(
                  'showPricePerUnit',
                  !formik.values.showPricePerUnit
                )
              }
              value={formik.values.showPricePerUnit}
            />
          </div>
        </div>
      </div>

      <div className='flex gap-4 items-center justify-center mt-6'>
        <SubmitButton
          title='Зберегти'
          isSubmitting={isSubmitting}
          className='px-4 py-2'
        />
        <p className='block text-center text-sm uppercase'>Або</p>
        <DeleteButton
          onClick={handleDeleteButton}
          isSubmitting={isSubmitting}
          withoutSpinner
        />
      </div>
    </form>
  );
}
