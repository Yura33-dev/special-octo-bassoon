'use client';

import { FormikHelpers, useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'sonner';
import { slugify } from 'transliteration';

import { createProducer, patchProducerById } from '@/lib/api';
import { DELETE_PRODUCER_ID } from '@/lib/constants';
import { producerValidationSchema } from '@/lib/validations';
import { useModalStore } from '@/providers';
import { IProducerForm, IProducerMapped } from '@/types';

import DeleteButton from '../../shared/forms-elements/DeleteButton';
import Input from '../../shared/forms-elements/Input';
import SubmitButton from '../../shared/forms-elements/SubmitButton';

interface IProducerFormProps {
  producer?: IProducerMapped;
  isAddForm?: boolean;
}

export default function ProducerForm({
  producer,
  isAddForm = false,
}: IProducerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const openModal = useModalStore(state => state.openModal);

  const initialValues: IProducerForm = {
    translatedData: {
      uk: { title: producer?.translatedData['uk'].title ?? '' },
      ru: { title: producer?.translatedData['ru'].title ?? '' },
    },
    currency: producer?.currency ?? null,
    exchangeRate: producer?.exchangeRate ?? null,
    slug: producer?.slug ?? '',
  };

  const onSubmit = async (
    values: IProducerForm,
    helpers: FormikHelpers<IProducerForm>
  ) => {
    setIsSubmitting(true);

    try {
      if (isAddForm) {
        await createProducer(values);
        helpers.resetForm();
      } else if (!isAddForm && producer) {
        await patchProducerById(producer.id, values);
      }
      toast.success(`Виробника успішно ${isAddForm ? 'створено' : 'оновлено'}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          `Сталася помилка при ${isAddForm ? 'створені' : 'оновленні'} виробника`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteButton = () => {
    openModal(DELETE_PRODUCER_ID);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: producerValidationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className='flex flex-col gap-4 p-4 bg-gray-200 rounded-md'>
          <h2 className='text-lg font-semibold md:mb-4'>
            Українська локалізація
          </h2>

          <Input
            title='Назва'
            placeholder='Syngenta'
            name='translatedData.uk.title'
            type='text'
            onChange={e => {
              const value = e.target.value;
              formik.setFieldValue('translatedData.uk.title', value);
              formik.setFieldValue('slug', slugify(value, { lowercase: true }));
            }}
            onBlur={formik.handleBlur}
            value={formik.values.translatedData['uk'].title}
            touched={formik.touched}
            errors={formik.errors}
            className='sm:max-w-72'
            labelClassName='min-h-[72px]'
          />
        </div>

        <div className='flex flex-col gap-4 p-4 bg-gray-200 rounded-md'>
          <h2 className='text-lg font-semibold md:mb-4'>
            Російська локалізація
          </h2>

          <Input
            title='Назва'
            placeholder='Syngenta'
            name='translatedData.ru.title'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.translatedData['ru'].title}
            touched={formik.touched}
            errors={formik.errors}
            className='sm:max-w-72'
            labelClassName='min-h-[72px]'
          />
        </div>

        <div className='p-4 bg-gray-200 rounded-md col-span-full'>
          <div className='flex flex-col gap-6 lg:flex-row lg:gap-8'>
            <Input
              title='Валюта'
              placeholder='EUR / USD'
              name='currency'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currency}
              touched={formik.touched}
              errors={formik.errors}
              labelClassName='basis-full min-h-[72px]'
            />
            <Input
              title='Курс валюти'
              placeholder='43.52'
              name='exchangeRate'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.exchangeRate}
              touched={formik.touched}
              errors={formik.errors}
              labelClassName='basis-full min-h-[72px]'
            />
          </div>
        </div>

        <div className='p-4 bg-gray-200 rounded-md col-span-full'>
          <Input
            title='Ідентифікатор'
            name='slug'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.slug}
            touched={formik.touched}
            errors={formik.errors}
            labelClassName='basis-full min-h-[72px]'
            disabled={true}
          />
        </div>
      </div>

      <div className='flex gap-4 items-center justify-center mt-6'>
        <SubmitButton
          title='Зберегти'
          isSubmitting={isSubmitting}
          className='px-4 py-2'
        />
        {!isAddForm && (
          <>
            <p className='block text-center text-sm uppercase'>Або</p>

            <DeleteButton
              onClick={handleDeleteButton}
              isSubmitting={isSubmitting}
              withoutSpinner
            />
          </>
        )}
      </div>
    </form>
  );
}
