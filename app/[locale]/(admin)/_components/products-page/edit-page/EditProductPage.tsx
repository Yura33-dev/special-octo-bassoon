import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { routing } from '@/i18n/routing';
import {
  getAllCategories,
  getAllFilters,
  getAllPackaging,
  getAllProducers,
  getProductBySlug,
} from '@/lib/api';
import { locale } from '@/types';

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

  const [packaging, categories, filters, product, producers] =
    await Promise.all([
      getAllPackaging(locale),
      getAllCategories({ main: true }),
      getAllFilters(locale),
      getProductBySlug(productSlug, routing.locales),
      getAllProducers(locale),
    ]);

  if (!product) notFound();

  return (
    <section>
      <Container>
        <BackButton title='Всі продукти' />
        <PageMainHeader
          title={`Редагувати ${product.translatedData[locale].name}`}
          className='mb-8'
          link={`${product.categories[0].slug[locale]}/${product.categories[1].slug[locale]}/${product.translatedData[locale].slug}`}
        />

        <ProductForm
          product={product}
          categories={categories}
          packaging={packaging}
          filters={filters}
          producers={producers}
        />

        <ProductDeleteModal
          productId={product.id}
          productTitle={product.translatedData[locale].name}
        />
      </Container>
    </section>
  );
}
