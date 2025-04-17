import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import {
  getAllCategories,
  getAllFilters,
  getAllPackaging,
  getAllProducers,
} from '@/lib/api';
import { locale } from '@/types';

import BackButton from '../../shared/BackButton';
import PageMainHeader from '../../shared/page-elements/PageMainHeader';
import ProductForm from '../forms/ProductForm';

export default async function NewProductsPage() {
  const locale = (await getLocale()) as locale;

  const [packaging, categories, filters, producers] = await Promise.all([
    getAllPackaging(locale),
    getAllCategories({ main: true }),
    getAllFilters(locale),
    getAllProducers(locale),
  ]);

  return (
    <Container>
      <BackButton title='Всі продукти' href='/dashboard/products' />
      <PageMainHeader title='Додати новий продукт' className='mb-8' />

      <ProductForm
        packaging={packaging}
        categories={categories}
        filters={filters}
        producers={producers}
        isAddForm
      />
    </Container>
  );
}
