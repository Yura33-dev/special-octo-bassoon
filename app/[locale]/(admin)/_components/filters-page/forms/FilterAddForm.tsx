'use client';

import { FormikHelpers, useFormik } from 'formik';
import { CirclePlus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { slugify } from 'transliteration';

import { useRouter } from '@/i18n/routing';
import { createFilter } from '@/lib/api';
import { ADD_FILTER_ID } from '@/lib/constants';
import { createFilterSchema } from '@/lib/validations';
import { useModalStore } from '@/providers';
import { ICreateFilterFormField } from '@/types';

import Input from '../../shared/forms-elements/Input';
import SubmitButton from '../../shared/forms-elements/SubmitButton';

export default function FilterAddForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [variants, setVariants] = useState([
    {
      variantSlug: '',
      translatedData: { uk: { variantTitle: '' }, ru: { variantTitle: '' } },
    },
  ]);

  const closeModal = useModalStore(state => state.closeModal);
  const router = useRouter();

  const initialValues: ICreateFilterFormField = {
    slug: '',
    translatedData: {
      uk: { filterTitle: '' },
      ru: { filterTitle: '' },
    },
    variants,
  };

  const onSubmit = async (
    values: ICreateFilterFormField,
    helpers: FormikHelpers<ICreateFilterFormField>
  ) => {
    setIsSubmitting(true);

    try {
      await createFilter(values);
      toast.success('Фільтр успішно створено!');
      closeModal(ADD_FILTER_ID);
      setTimeout(() => router.back(), 210);
      helpers.resetForm();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Сталася помилка при створенні фільтра');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: createFilterSchema,
  });

  const handleAddVariant = () => {
    setVariants(prev => [
      ...prev,
      {
        variantSlug: '',
        translatedData: { uk: { variantTitle: '' }, ru: { variantTitle: '' } },
      },
    ]);
    formik.setFieldValue('variants', [
      ...formik.values.variants,
      {
        variantSlug: '',
        translatedData: { uk: { variantTitle: '' }, ru: { variantTitle: '' } },
      },
    ]);
  };

  const handleRemoveVariant = (index: number) => {
    if (formik.values.variants.length > 1) {
      const newVariants = [...formik.values.variants];
      newVariants.splice(index, 1);
      setVariants(newVariants);
      formik.setFieldValue('variants', newVariants);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className='flex flex-col gap-4 p-4 bg-gray-200 rounded-md'>
          <h2 className='text-lg font-semibold md:mb-4'>
            Українська локалізація
          </h2>

          <Input
            title='Назва'
            name='translatedData.uk.filterTitle'
            type='text'
            onChange={e => {
              const name = e.target.value;
              formik.setFieldValue('translatedData.uk.filterTitle', name);
              formik.setFieldValue('slug', slugify(name, { lowercase: true }));
            }}
            onBlur={formik.handleBlur}
            value={formik.values.translatedData.uk.filterTitle}
            touched={formik.touched}
            errors={formik.errors}
          />
        </div>

        <div className='flex flex-col gap-4 p-4 bg-gray-200 rounded-md'>
          <h2 className='text-lg font-semibold md:mb-4'>
            Російська локалізація
          </h2>

          <Input
            title='Назва'
            name='translatedData.ru.filterTitle'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.translatedData.ru.filterTitle}
            touched={formik.touched}
            errors={formik.errors}
          />
        </div>

        <div className='flex flex-col gap-4 p-4 bg-gray-200 rounded-md col-span-full'>
          <h2 className='text-lg font-semibold md:mb-4'>Варіації фільтру</h2>

          {formik.values.variants.map((_, index) => (
            <div
              key={index}
              className='flex flex-col lg:flex-row lg:justify-start lg:items-center gap-4 lg:gap-6 mb-5
                          bg-teal-700/10 p-4 rounded-md'
            >
              <Input
                title='Назва українською'
                type='text'
                name={`variants[${index}].translatedData.uk.variantTitle`}
                value={
                  formik.values.variants[index].translatedData.uk.variantTitle
                }
                onChange={e => {
                  const name = e.target.value;
                  formik.setFieldValue(
                    `variants[${index}].translatedData.uk.variantTitle`,
                    name
                  );
                  formik.setFieldValue(
                    `variants[${index}].variantSlug`,
                    slugify(name, { lowercase: true })
                  );
                }}
                onBlur={formik.handleBlur}
                touched={formik.touched}
                errors={formik.errors}
                labelClassName='flex-grow md:min-h-[80px]'
              />

              <Input
                title='Назва російською'
                type='text'
                name={`variants[${index}].translatedData.ru.variantTitle`}
                value={
                  formik.values.variants[index].translatedData.ru.variantTitle
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched}
                errors={formik.errors}
                labelClassName='flex-grow md:min-h-[80px]'
              />

              <Input
                title='Ідентифікатор'
                type='text'
                name={`variants[${index}].variantSlug`}
                value={formik.values.variants[index].variantSlug}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                touched={formik.touched}
                errors={formik.errors}
                labelClassName='flex-grow md:min-h-[80px]'
              />

              <button
                aria-label='Видалити варіант фільтра'
                type='button'
                className='self-center flex justify-center bg-primary rounded-md px-6 py-2 transition-colors disabled:bg-gray-500'
                onClick={() => handleRemoveVariant(index)}
                disabled={formik.values.variants.length === 1}
              >
                <Trash2
                  className='w-5 h-5 text-white'
                  focusable={false}
                  aria-hidden={true}
                />
              </button>
            </div>
          ))}
          <button
            aria-label='Додати варіант фільтра'
            type='button'
            className='block bg-primary text-white px-4 py-2 rounded-md transition-colors hover:bg-primary-dark mx-auto'
            onClick={handleAddVariant}
          >
            <CirclePlus
              className='w-5 h-5'
              focusable={false}
              aria-hidden={true}
            />
          </button>
        </div>

        <div className='flex flex-col gap-4 p-4 bg-gray-200 rounded-md col-span-full'>
          <h2 className='text-lg font-semibold md:mb-4'>Технічні параметри</h2>
          <Input
            title='Ідентифікатор фільтру'
            name='slug'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.slug}
            touched={formik.touched}
            errors={formik.errors}
            labelClassName='min-h-[80px]'
          />
        </div>
      </div>

      <SubmitButton
        title='Створити'
        isSubmitting={isSubmitting}
        className='mt-6 mx-auto'
      />
    </form>
  );
}
