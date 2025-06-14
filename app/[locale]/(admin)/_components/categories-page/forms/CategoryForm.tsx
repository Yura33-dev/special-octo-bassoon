'use client';

import clsx from 'clsx';
import { useFormik } from 'formik';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { slugify } from 'transliteration';

import { useRouter } from '@/i18n/routing';
import { createCategory, patchCategoryById } from '@/lib/api';
import { ADD_CATEGORY_ID, DELETE_CATEGORY_ID } from '@/lib/constants';
import { categoryValidationSchema } from '@/lib/validations';
import { useModalStore } from '@/providers';
import { ICategoryForm, ICategoryMapped, locale } from '@/types';

import CategoryAddSelect from '../../shared/forms-elements/CategoryAddSelect';
import CustomCheckBox from '../../shared/forms-elements/CustomCheckBox';
import DeleteButton from '../../shared/forms-elements/DeleteButton';
import FileUploader from '../../shared/forms-elements/FileUploader';
import Input from '../../shared/forms-elements/Input';
import SubmitButton from '../../shared/forms-elements/SubmitButton';

interface ICategoryFormProps {
  category?: ICategoryMapped;
  isAddForm?: boolean;
}

export default function CategoryForm({
  isAddForm = false,
  category,
}: ICategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const closeModal = useModalStore(state => state.closeModal);
  const openModal = useModalStore(state => state.openModal);

  const router = useRouter();
  const locale = useLocale() as locale;

  const initialValues: ICategoryForm = {
    name: { uk: category?.name['uk'] ?? '', ru: category?.name['ru'] ?? '' },
    slug: { uk: category?.slug['uk'] ?? '', ru: category?.slug['ru'] ?? '' },
    main: category?.main ?? true,
    sortOrder: category?.sortOrder ?? 0,
    featured: category?.featured ?? false,
    visible: category?.visible ?? true,
    image: category?.image ?? null,
    childCategories: [],
    parentCategories: [],
  };

  const onSubmit = async (values: ICategoryForm) => {
    setIsSubmitting(true);

    if (values.image instanceof File) {
      const formData = new FormData();
      const width = 600;

      formData.append('image', values.image);
      formData.append('width', String(width));
      formData.append('imageTitle', values.slug['uk']);
      formData.append('folder', 'categories');

      const response = await fetch('/api/v1/admin/products/image', {
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

    values.image =
      typeof values.image === 'string' ? values.image : '/no-image.webp';

    try {
      if (isAddForm) {
        await createCategory(values);
        console.log(values);
        closeModal(ADD_CATEGORY_ID);
      } else if (!isAddForm && category) {
        const updatedCategory = await patchCategoryById(category.id, {
          name: values.name,
          slug: values.slug,
          main: values.main,
          sortOrder: values.sortOrder,
          visible: values.visible,
          featured: values.featured,
          image: values.image,
        });
        router.replace(updatedCategory?.slug[locale] ?? category.slug[locale]);
      }
      toast.success(
        `Категорія успішно ${isAddForm ? 'створена!' : 'оновлена!'}`
      );
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

  const handleDeleteButton = () => {
    openModal(DELETE_CATEGORY_ID);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: categoryValidationSchema,
  });

  useEffect(() => {
    if (formik) {
      if (formik.values.main) {
        if (
          formik.values.parentCategories &&
          formik.values.parentCategories.length > 0
        ) {
          formik.setFieldValue('parentCategories', []);
        }
      } else {
        if (
          formik.values.childCategories &&
          formik.values.childCategories.length > 0
        ) {
          formik.setFieldValue('childCategories', []);
        }
      }
    }
  }, [formik, formik.values.main]);

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
              name='name.uk'
              type='text'
              onChange={e => {
                const name = e.target.value;
                formik.setFieldValue('name.uk', name);
                formik.setFieldValue(
                  'slug.uk',
                  slugify(name, { lowercase: true })
                );
              }}
              onBlur={formik.handleBlur}
              value={formik.values.name['uk']}
              touched={formik.touched}
              errors={formik.errors}
              className='sm:max-w-72'
            />

            <Input
              title='Ідентифікатор'
              name='slug.uk'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.slug['uk']}
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
              name='name.ru'
              type='text'
              onChange={e => {
                const name = e.target.value;
                formik.setFieldValue('name.ru', name);
                formik.setFieldValue(
                  'slug.ru',
                  slugify(name, { lowercase: true })
                );
              }}
              onBlur={formik.handleBlur}
              value={formik.values.name['ru']}
              touched={formik.touched}
              errors={formik.errors}
              className='sm:max-w-72'
            />

            <Input
              title='Ідентифікатор'
              name='slug.ru'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.slug['ru']}
              touched={formik.touched}
              errors={formik.errors}
              className='sm:max-w-72'
            />
          </div>
        </div>
      </div>

      {/* Sort order, available in main page, activity, image */}
      <div className='flex flex-col md:flex-row gap-4'>
        <div
          className={clsx(
            'p-4 bg-gray-200 mt-5 rounded-md basis-full',
            isAddForm && 'md:basis-1/2'
          )}
        >
          <div
            className={clsx(
              'flex gap-6 lg:gap-8 flex-wrap',
              isAddForm && 'flex-col'
            )}
          >
            {isAddForm && (
              <CustomCheckBox
                title='Тип категорії'
                falseTitle='Дочірня'
                trueTitle='Основна'
                onClick={() =>
                  formik.setFieldValue('main', !formik.values.main)
                }
                value={formik.values.main}
              />
            )}

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

          <FileUploader<ICategoryForm>
            labelClassName='mt-6'
            name='image'
            imageUrl={null}
            onChange={file => formik.setFieldValue('image', file)}
            touched={formik.touched}
            errors={formik.errors}
          />
        </div>

        {isAddForm && (
          <CategoryAddSelect<ICategoryForm>
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
                ? formik.values.childCategories || []
                : formik.values.parentCategories || []
            }
            touched={formik.touched}
            errors={formik.errors}
          />
        )}
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
