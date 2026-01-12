import { CirclePlus } from 'lucide-react';
import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { Link } from '@/i18n/routing';
import {
  getAllCategories,
  getAllProducers,
  getAllProducts,
  getFiltersFromProducts,
} from '@/lib/api';
import { DEFAULT_PAGE, PRODUCT_DISPLAY_LIMIT } from '@/lib/constants';
import { locale } from '@/types';

import AdminFilter from './filter/AdminFilter';
import ProductList from './products-grid/ProductList';
import PageMainHeader from '../shared/page-elements/PageMainHeader';

interface IProductsPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    [key: string]: string | undefined;
  };
}

export default async function ProductsPage({
  searchParams,
}: IProductsPageProps) {
  const page = parseInt(searchParams.page || DEFAULT_PAGE);
  const limit = parseInt(searchParams.limit || PRODUCT_DISPLAY_LIMIT);

  const locale = (await getLocale()) as locale;

  const [{ filters }, { products, paginationData }, subCategories, producers] =
    await Promise.all([
      getFiltersFromProducts(locale),
      getAllProducts(locale, page, limit, searchParams),
      getAllCategories({ main: false }),
      getAllProducers(locale),
    ]);

  const categoriesFilter = new Map<string, { title: string; slug: string }>();
  const producersFilter = new Map<string, { title: string; slug: string }>();

  subCategories.forEach(category => {
    categoriesFilter.set(category.slug[locale], {
      title: category.name[locale],
      slug: category.slug[locale],
    });
  });

  producers.forEach(producer => {
    producersFilter.set(producer.slug, {
      title: producer.translatedData[locale].title,
      slug: producer.slug,
    });
  });

  const resultCategoriesFilterArray = Array.from(categoriesFilter.values());

  const resultProducersFilterArray = Array.from(producersFilter.values());

  const categoriesFilterObject = {
    slug: 'category',
    title: 'Підкатегорія',
    variants: resultCategoriesFilterArray,
  };

  const producersFilterObject = {
    slug: 'producer',
    title: 'Виробник',
    variants: resultProducersFilterArray,
  };

  const labelsFilterObject = {
    slug: 'labels',
    title: 'Лейбл',
    variants: [{ slug: 'top', title: 'ТОП' }],
  };

  return (
    <section>
      <Container>
        <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center justify-between sm:gap-8'>
          <PageMainHeader title='Продукти' length={paginationData.totalItems} />
          <Link
            href='/dashboard/products/new'
            className='text-sm p-2 bg-primary rounded-md font-semibold flex items-center gap-3 justify-center transition-colors hover:bg-primary-dark text-white'
          >
            <span>Додати</span>
            <CirclePlus className='w-5 h-5' />
          </Link>
        </div>

        <div className='flex flex-col-reverse lg:flex-row items-start gap-4 min-h-screen mt-10'>
          {products.length > 0 ? (
            <ProductList products={products} paginationData={paginationData} />
          ) : (
            <h2 className='basis-full text-base'>
              Список товарів порожній. Спробуйте змінити фільтри для пошуку
            </h2>
          )}

          <AdminFilter
            filters={[
              categoriesFilterObject,
              labelsFilterObject,
              producersFilterObject,
              ...filters,
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
