'use client';

import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { slugify } from 'transliteration';

import { createCategory } from '@/lib/api';
import { ADD_CATEGORY_ID } from '@/lib/constants';
// import { ErrorHandler } from '@/lib/handlers';
import { createCategorySchema } from '@/lib/validations';
import { useModalStore } from '@/providers';
import { ICreateCategoryFormField, ICreateCategoryStructured } from '@/types';

import CategoryAddSelect from './elements/CategoryAddSelect';
import CustomCheckBox from './elements/CustomCheckBox';
import FileUploader from './elements/FileUploader';
import Input from './elements/Input';
import SubmitButton from './elements/SubmitButton';

export default function CategoryAddForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const closeModal = useModalStore(state => state.closeModal);

  const initialValues: ICreateCategoryFormField = {
    nameUk: '',
    nameRu: '',
    slugUk: '',
    slugRu: '',
    main: true,
    sortOrder: 0,
    featured: false,
    visible: true,
    image: null,
    childCategories: [],
    parentCategories: [],
  };

  const onSubmit = async (values: ICreateCategoryFormField) => {
    setIsSubmitting(true);

    if (values.image instanceof File) {
      const formData = new FormData();
      const width = 600;

      formData.append('image', values.image);
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

    const dataToSave: ICreateCategoryStructured = {
      name: { uk: values.nameUk.trim(), ru: values.nameRu.trim() },
      slug: { uk: values.slugUk.trim(), ru: values.slugRu.trim() },
      sortOrder: values.sortOrder,
      visible: values.visible,
      featured: values.featured,
      parentCategories: values.parentCategories,
      childCategories: values.childCategories,
      main: values.main,
      image: typeof values.image === 'string' ? values.image : '/no-image.webp',
    };

    try {
      await createCategory(dataToSave);
      toast.success('Категорія успішно створена!');
      closeModal(ADD_CATEGORY_ID);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Сталася помилка при створенні категорії');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: createCategorySchema,
  });

  useEffect(() => {
    if (formik) {
      if (formik.values.main) {
        if (formik.values.parentCategories.length > 0) {
          formik.setFieldValue('parentCategories', []);
        }
      } else {
        if (formik.values.childCategories.length > 0) {
          formik.setFieldValue('childCategories', []);
        }
      }
    }
  }, [formik, formik.values.main]);

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Локалізація */}
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

      {/* Порядок сортування, чи показувати на головній, активність, фото */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='p-4 bg-gray-200 mt-5 rounded-md basis-full md:basis-1/2'>
          <div className='flex flex-col gap-6 lg:gap-8'>
            <CustomCheckBox
              title='Тип категорії'
              falseTitle='Дочірня'
              trueTitle='Основна'
              onClick={() => formik.setFieldValue('main', !formik.values.main)}
              value={formik.values.main}
            />

            <Input
              title='Порядок сортування'
              name='sortOrder'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sortOrder as unknown as string}
              touched={formik.touched}
              errors={formik.errors}
              className='max-w-36'
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

          <FileUploader
            name='image'
            image={null}
            onChange={file => formik.setFieldValue('image', file)}
            touched={formik.touched}
            errors={formik.errors}
          />
        </div>

        <CategoryAddSelect
          className='md:mt-5 basis-full md:basis-1/2 p-4 bg-gray-200 rounded-md'
          isMain={formik.values.main}
          title={`Оберіть ${formik.values.main ? 'дочірні' : 'батьківські'} категорії`}
          placeholder={'Оберіть категорії...'}
          name={formik.values.main ? 'childCategories' : 'parentCategories'}
          onChange={selectedOptions =>
            formik.setFieldValue(
              formik.values.main ? 'childCategories' : 'parentCategories',
              selectedOptions ? selectedOptions.map(option => option.id) : []
            )
          }
          value={
            formik.values.main
              ? formik.values.childCategories
              : formik.values.parentCategories
          }
          touched={formik.touched}
          errors={formik.errors}
        />
      </div>

      <SubmitButton
        title='Створити'
        isSubmitting={isSubmitting}
        className='mt-6 mx-auto'
      />
    </form>
  );
}
