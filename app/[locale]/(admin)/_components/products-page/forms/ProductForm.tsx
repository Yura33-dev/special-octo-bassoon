'use client';

import { FormikHelpers, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import ShortUniqueId from 'short-unique-id';
import { toast } from 'sonner';
import { slugify } from 'transliteration';

import { useRouter } from '@/i18n/routing';
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

  const [producer, setProducer] = useState<IProducerMapped | null>(null);

  useEffect(() => {
    if (!isAddForm) {
      const filterObj = product?.filters.find(
        filter => filter.filter.slug === 'virobnik'
      );
      const producerInProduct = producers.find(
        producer =>
          slugify(producer.translatedData['uk'].title) === filterObj?.value
      );

      setProducer(producerInProduct ?? null);
    }
  }, [isAddForm, product, producers]);

  const openModal = useModalStore(state => state.openModal);

  const router = useRouter();

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
      product?.filters.map(filter => ({
        id: filter.filter.id,
        filter: filter.filter.id,
        value: filter.value,
      })) ?? [],

    labels: product?.labels ?? [],

    producer: product?.producer.id ?? null,
  };

  const handleSelectProducer = (producerSlug: string) => {
    const producer = producers.find(
      producer => slugify(producer.translatedData['uk'].title) === producerSlug
    );

    if (producer) {
      setProducer(producer);

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
    const restPackaging = [
      ...formik.values.packaging.items.slice(0, packIndex),
      ...formik.values.packaging.items.slice(packIndex + 1),
    ];

    formik.setFieldValue('packaging.items', restPackaging);
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
    const producerFilter = producers.find(
      producer => slugify(producer.translatedData['uk'].title) === filter.value
    );

    if (producerFilter) {
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

      const response = await fetch('/api/upload', {
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
        toast.success('Продукт успішно створено!');
        helpers.resetForm();
        setProductDescriptionUk('');
        setProductDescriptionRu('');
      } else {
        await updateProduct(values);
        router.replace('/dashboard/products');
        router.refresh();
        toast.success('Продукт успішно оновлено!');
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
          producer={producer}
        />

        <Visual title='Візуальні дані' formik={formik} />

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
