'use client';

import { useFormik } from 'formik';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';
import { slugify } from 'transliteration';

import { useRouter } from '@/i18n/routing';
import { patchCategoryById } from '@/lib/api';
import { DELETE_CATEGORY_ID } from '@/lib/constants';
import { editCategorySchema } from '@/lib/validations';
import { useModalStore } from '@/providers';
import {
  ICategoryMapped,
  IEditCategoryFormField,
  IEditCategoryStructured,
  locale,
} from '@/types';

import CustomCheckBox from '../../shared/forms-elements/CustomCheckBox';
import DeleteButton from '../../shared/forms-elements/DeleteButton';
import FileUploader from '../../shared/forms-elements/FileUploader';
import Input from '../../shared/forms-elements/Input';
import SubmitButton from '../../shared/forms-elements/SubmitButton';

interface ICategoryEditFormProps {
  category: ICategoryMapped;
}

export default function CategoryEditForm({ category }: ICategoryEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = useModalStore(state => state.openModal);

  const router = useRouter();
  const locale = useLocale() as locale;

  const initialValues: IEditCategoryFormField = {
    nameUk: category.name['uk'] ?? '',
    nameRu: category.name['ru'] ?? '',
    slugUk: category.slug['uk'] ?? '',
    slugRu: category.slug['ru'] ?? '',
    sortOrder: category.sortOrder ?? 0,
    featured: category.featured,
    visible: category.visible ?? true,
    image: category.image,
  };

  const onSubmit = async (values: IEditCategoryFormField) => {
    setIsSubmitting(true);

    if (values.image instanceof File) {
      const formData = new FormData();
      formData.append('image', values.image);

      const width = 600;
      formData.append('width', String(width));

      formData.append('imageTitle', values.slugUk);

      formData.append('folder', 'categories');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (result.url) {
        values.image = result.url;
      } else {
        values.image = '/no-image.webp';
        console.error('Something went wrong while image to S3 loading...');
      }
    }

    const dataToSave: IEditCategoryStructured = {
      name: { uk: values.nameUk, ru: values.nameRu },
      slug: { uk: values.slugUk, ru: values.slugRu },
      sortOrder: values.sortOrder,
      visible: values.visible,
      featured: values.featured,
    };

    if (values.image !== category.image) {
      dataToSave.image =
        typeof values.image === 'string' ? values.image : '/no-image.webp';
    }

    try {
      const updatedCategory = await patchCategoryById(category.id, dataToSave);
      router.replace(updatedCategory?.slug[locale] ?? category.slug[locale]);
      toast.success('Категорія успішно оновлена!');
    } catch (error) {
      console.error(error);
      toast.error('Помилка при оновленні категорії. Спробуйте ще раз');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: editCategorySchema,
  });

  const handleDeleteButton = () => {
    openModal(DELETE_CATEGORY_ID);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Locale */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className='flex flex-col gap-4 p-4 bg-gray-200 rounded-md'>
          <h2 className='text-lg font-semibold md:mb-4'>
            Українська локалізація
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2'>
            <Input
              title='Назва'
              name='nameUk'
              type='text'
              onChange={e => {
                const name = e.target.value;
                formik.setFieldValue('nameUk', name);
                formik.setFieldValue(
                  'slugUk',
                  slugify(name, { lowercase: true })
                );
              }}
              onBlur={formik.handleBlur}
              value={formik.values.nameUk}
              touched={formik.touched}
              errors={formik.errors}
              className='sm:max-w-72'
            />

            <Input
              title='Посилання'
              name='slugUk'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.slugUk}
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
              name='nameRu'
              type='text'
              onChange={e => {
                const name = e.target.value;
                formik.setFieldValue('nameRu', name);
                formik.setFieldValue(
                  'slugRu',
                  slugify(name, { lowercase: true })
                );
              }}
              onBlur={formik.handleBlur}
              value={formik.values.nameRu}
              touched={formik.touched}
              errors={formik.errors}
              className='sm:max-w-72'
            />

            <Input
              title='Посилання'
              name='slugRu'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.slugRu}
              touched={formik.touched}
              errors={formik.errors}
              className='sm:max-w-72'
            />
          </div>
        </div>
      </div>

      {/* Sort order, activity, show on main page, image */}
      <div className='p-4 bg-gray-200 mt-5 rounded-md'>
        <div className='flex flex-col lg:flex-row gap-6 lg:gap-10'>
          <Input
            title='Порядок сортування'
            name='sortOrder'
            type='text'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.sortOrder as unknown as string}
            touched={formik.touched}
            errors={formik.errors}
            className='sm:max-w-36'
          />

          <CustomCheckBox
            title='Показувати в блоці `Наші продукти`'
            falseTitle='Ні'
            trueTitle='Так'
            onClick={() =>
              formik.setFieldValue('featured', !formik.values.featured)
            }
            value={formik.values.featured}
          />

          <CustomCheckBox
            title='Активність'
            falseTitle='Ні'
            trueTitle='Так'
            onClick={() =>
              formik.setFieldValue('visible', !formik.values.visible)
            }
            value={formik.values.visible}
          />
        </div>

        <FileUploader<IEditCategoryStructured>
          labelClassName='mt-6'
          name='image'
          imageUrl={category.image || null}
          onChange={file => formik.setFieldValue('image', file)}
          touched={formik.touched}
          errors={formik.errors}
        />
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
