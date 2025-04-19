import { CirclePlus } from 'lucide-react';
import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { Link } from '@/i18n/routing';
import { getAllProducts, getFiltersFromProducts } from '@/lib/api';
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
  const page = parseInt(searchParams.page || '1');
  const limit = parseInt(searchParams.limit || '9');

  const locale = (await getLocale()) as locale;

  const [{ filters }, { products, paginationData, totalProducts }] =
    await Promise.all([
      getFiltersFromProducts(locale),
      getAllProducts(locale, page, limit, searchParams),
    ]);

  const categoriesFilter = new Map<string, { title: string; slug: string }>();

  products.forEach(product =>
    product.categories.forEach(category => {
      if (!category.main) {
        categoriesFilter.set(category.slug[locale], {
          title: category.name[locale],
          slug: category.slug[locale],
        });
      }
    })
  );

  const resultArray = Array.from(categoriesFilter.values());

  const categoriesFilterObject = {
    slug: 'category',
    title: 'Підкатегорія',
    variants: resultArray,
  };

  return (
    <section>
      <Container>
        <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center justify-between sm:gap-8'>
          <PageMainHeader title='Продукти' length={totalProducts} />
          <Link
            href='/dashboard/products/new'
            className='text-sm p-2 bg-primary rounded-md font-semibold flex items-center gap-3 justify-center transition-colors hover:bg-primary-dark text-white'
          >
            <span>Додати</span>
            <CirclePlus className='w-5 h-5' />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className='flex flex-col-reverse lg:flex-row items-start gap-4 min-h-screen mt-10'>
            <ProductList products={products} paginationData={paginationData} />

            <AdminFilter filters={[...filters, categoriesFilterObject]} />
          </div>
        ) : (
          <h2 className='mt-10 text-xl'>Список товарів порожній</h2>
        )}
      </Container>
    </section>
  );
}
