import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import {
  getAllCategories,
  getAllFilters,
  getAllPackaging,
  getProductBySlug,
} from '@/lib/api';
import { IProductMapped, locale } from '@/types';

import BackButton from '../../shared/BackButton';
import PageMainHeader from '../../shared/page-elements/PageMainHeader';
import ProductForm from '../forms/ProductForm';
import ProductDeleteModal from '../modals/ProductDeleteModal';

interface IEditProductPageProps {
  productSlug: string;
}

export default async function EditProductPage({
  productSlug,
}: IEditProductPageProps) {
  const locale = (await getLocale()) as locale;

  const [packaging, categories, filters, product] = await Promise.all([
    getAllPackaging(locale),
    getAllCategories(locale, { main: true }),
    getAllFilters(locale),
    (await getProductBySlug(productSlug, locale)) as IProductMapped,
  ]);

  if (!product) notFound();

  return (
    <section>
      <Container>
        <BackButton title='Всі продукти' href='/dashboard/products' />
        <PageMainHeader
          title={`Редагувати ${product.translatedData[locale].name}`}
          className='mb-8'
        />

        <ProductForm
          product={product}
          categories={categories}
          packaging={packaging}
          filters={filters}
          isAddForm={false}
        />

        <ProductDeleteModal
          productId={product.id}
          productTitle={product.translatedData[locale].name}
        />
      </Container>
    </section>
  );
}
