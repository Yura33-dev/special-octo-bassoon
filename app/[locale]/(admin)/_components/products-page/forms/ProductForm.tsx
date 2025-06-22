'use client';

import { FormikHelpers, useFormik } from 'formik';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import ShortUniqueId from 'short-unique-id';
import { toast } from 'sonner';

import { routing, useRouter } from '@/i18n/routing';
import { createProduct, updateProduct } from '@/lib/api';
import { DELETE_PRODUCT_ID } from '@/lib/constants';
import { validationProductSchema } from '@/lib/validations';
import { useModalStore } from '@/providers';
import {
  ICategoryMapped,
  IProductForm,
  IFilterMapped,
  IPackagingMapped,
  IProductMapped,
  IProducerMapped,
} from '@/types';

import Categories from './blocks/Categories';
import Filters from './blocks/Filters';
import Labels from './blocks/Labels';
import Localization from './blocks/Localization';
import Packaging from './blocks/Packaging';
import Visual from './blocks/Visual';
import DeleteButton from '../../shared/forms-elements/DeleteButton';
import SubmitButton from '../../shared/forms-elements/SubmitButton';

interface IProductEditFormProps {
  product?: IProductMapped;
  categories: Array<ICategoryMapped>;
  packaging: Array<IPackagingMapped>;
  filters: Array<IFilterMapped>;
  producers: Array<IProducerMapped>;
  isAddForm?: boolean;
}

export default function ProductForm({
  product,
  categories,
  packaging,
  filters,
  producers,
  isAddForm = false,
}: IProductEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [productDescriptionUk, setProductDescriptionUk] = useState<string>(
    product?.translatedData['uk'].description ?? ''
  );
  const [productDescriptionRu, setProductDescriptionRu] = useState<string>(
    product?.translatedData['ru'].description ?? ''
  );

  const openModal = useModalStore(state => state.openModal);

  const router = useRouter();

  const locale = useLocale();

  const initialValues: IProductForm = {
    translatedData: {
      uk: {
        name: product?.translatedData['uk'].name ?? '',
        slug: product?.translatedData['uk'].slug ?? '',
        description: product?.translatedData['uk'].description ?? '',
        country: product?.translatedData['uk'].country ?? '',
        meta: {
          title: product?.translatedData['uk'].meta.title ?? '',
          keywords: product?.translatedData['uk'].meta.keywords ?? '',
          description: product?.translatedData['uk'].meta.description ?? '',
        },
      },
      ru: {
        name: product?.translatedData['ru'].name ?? '',
        slug: product?.translatedData['ru'].slug ?? '',
        description: product?.translatedData['ru'].description ?? '',
        country: product?.translatedData['ru'].country ?? '',
        meta: {
          title: product?.translatedData['ru'].meta.title ?? '',
          keywords: product?.translatedData['ru'].meta.keywords ?? '',
          description: product?.translatedData['ru'].meta.description ?? '',
        },
      },
    },
    categories: product?.categories.map(category => category.id) ?? [],

    packaging: {
      default: product?.packaging.default.id ?? null,
      items: product?.packaging.items.map(pack => ({
        packId: pack.packId.id,
        quantity: pack.quantity,
        price: Number((pack.price / 100).toFixed(2)),
      })) ?? [{ packId: null, quantity: null, price: null }],
    },

    imgUrl: product?.imgUrl ?? null,
    visible: product?.visible ?? true,

    filters:
      product?.filters?.map(filter => ({
        id: filter.id,
        filter: filter.filter.id,
        value: filter.value,
      })) ?? [],

    labels: product?.labels ?? [],

    producer: product?.producer?.id ?? null,
  };

  const handleSelectProducer = (producerSlug: string) => {
    const producer = producers.find(producer =>
      producer.slug === producerSlug ? producer : undefined
    );

    if (producer) {
      formik
        .setFieldValue('producer', producer.id, false)
        .then(() => {
          formik.setFieldTouched('producer', true, false);
        })
        .then(() => {
          formik.validateField('producer');
        });
    }
  };

  const handleAddPackaging = () => {
    formik.setFieldValue('packaging.items', [
      ...formik.values.packaging.items,
      { packId: null, quantity: null, price: null },
    ]);
  };

  const handleDeletePackaging = (packIndex: number) => {
    const deletedPack = formik.values.packaging.items[packIndex];
    if (formik.values.packaging.default === deletedPack.packId) {
      formik.setFieldValue('packaging.default', null);
    }

    formik.setFieldValue(
      'packaging.items',
      formik.values.packaging.items.filter(
        item => item.packId !== deletedPack.packId
      )
    );
  };

  const handleAddFilter = () => {
    const uid = new ShortUniqueId({ length: 6, dictionary: 'alpha_lower' });

    formik.setFieldValue('filters', [
      ...formik.values.filters,
      { id: uid.rnd(), filter: null, value: null },
    ]);
  };

  const handleDeleteFilter = (filter: {
    id: string;
    filter: string;
    value: string;
  }) => {
    const producer = producers.find(producer =>
      producer.slug === filter.value ? producer : undefined
    );

    if (producer) {
      formik
        .setFieldValue('producer', null, true)
        .then(() => {
          formik.setFieldTouched('producer', true, false);
        })
        .then(() => {
          formik.validateField('producer');
        });
    }

    formik.setFieldValue(
      'filters',
      formik.values.filters.filter(item => item.id !== filter.id)
    );
  };

  const onSubmit = async (
    values: IProductForm,
    helpers: FormikHelpers<IProductForm>
  ) => {
    setIsSubmitting(true);

    if (values.imgUrl instanceof File) {
      const formData = new FormData();
      const width = 600;

      formData.append('image', values.imgUrl);
      formData.append('width', String(width));
      formData.append('imageTitle', values.translatedData['uk'].slug);
      formData.append('folder', 'products');

      const response = await fetch('/api/v1/admin/products/image', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (result.url) {
        values.imgUrl = result.url;
      } else {
        values.imgUrl = '/no-image.webp';
        console.error(
          'Something went wrong while product image to S3 loading...'
        );
      }
    }

    values.imgUrl =
      typeof values.imgUrl === 'string' ? values.imgUrl : '/no-image.webp';

    values.translatedData['uk'].description = productDescriptionUk;
    values.translatedData['ru'].description = productDescriptionRu;

    try {
      if (isAddForm) {
        await createProduct(values);
        helpers.resetForm();
        setProductDescriptionUk('');
        setProductDescriptionRu('');
      } else {
        const updatedProduct = await updateProduct(
          values,
          product!.translatedData[locale].slug,
          routing.locales
        );

        if (
          product &&
          product.translatedData[locale].slug !==
            updatedProduct?.translatedData[locale].slug
        ) {
          router.replace(
            updatedProduct?.translatedData[locale].slug ?? '/dashboard/products'
          );
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          `${isAddForm ? 'Сталася помилка при створені продукту' : 'Сталася помилка при оновленні продукту'}`
        );
      }
    } finally {
      setIsSubmitting(false);
      toast.success(`Продукт успішно ${isAddForm ? 'створено!' : 'оновлено!'}`);
    }
  };

  const handleProductDeleteButton = () => {
    openModal(DELETE_PRODUCT_ID);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: validationProductSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
        <Localization
          title='Українська локалізація'
          formik={formik}
          productDescription={productDescriptionUk}
          setProductDescription={setProductDescriptionUk}
          locale='uk'
        />

        <Localization
          title='Російська локалізація'
          formik={formik}
          productDescription={productDescriptionRu}
          setProductDescription={setProductDescriptionRu}
          locale='ru'
        />

        <Categories title='Категорії' categories={categories} formik={formik} />

        <Filters
          title='Фільтри'
          filters={filters}
          formik={formik}
          onAddFilter={handleAddFilter}
          onDeleteFilter={handleDeleteFilter}
          handleSelectProducer={handleSelectProducer}
        />

        <Packaging
          title='Пакування'
          packaging={packaging}
          onAddPackaging={handleAddPackaging}
          onDeletePackaging={handleDeletePackaging}
          formik={formik}
          producer={product?.producer ?? null}
        />

        <Visual
          title='Візуальні дані'
          formik={formik}
          productImage={product?.imgUrl ?? null}
        />

        <Labels title='Лейбли' formik={formik} />
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
              onClick={handleProductDeleteButton}
              isSubmitting={isSubmitting}
              withoutSpinner
            />
          </>
        )}
      </div>
    </form>
  );
}
