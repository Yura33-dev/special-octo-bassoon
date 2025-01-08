import { Suspense } from 'react';

import Container from '@/components/shared/Container';
import CircleLoader from '@/components/shared/loaders/CircleLoader';
import { Link } from '@/i18n/routing';
import { locale } from '@/types';

import Catalog from '../_components/catalog-page/Catalog';
import Filter from '../_components/catalog-page/Filter';

export default async function CatalogPage({
  params,
  searchParams,
}: {
  params: { locale: locale };
  searchParams: { page?: string };
}) {
  const { locale } = params;
  const page = parseInt(searchParams.page || '1');

  return (
    <>
      <section className='mt-4'>
        <Container>
          <div className='breadcrumbs text-base'>
            <ul>
              <li>
                <Link href='/'>Головна</Link>
              </li>
              <li>Каталог</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className='mt-12'>
        <Container>
          <div className='flex flex-col items-stretch gap-6 lg:flex-row lg:items-start'>
            <Filter />
            <div className='basis-full flex flex-col gap-4'>
              <h1 className='text-center text-xl md:text-2xl'>
                Каталог продуктів <span className='uppercase'>ProGround</span>
              </h1>

              <div>Sorting</div>

              <Suspense fallback={<CircleLoader />}>
                <Catalog locale={locale} page={page} />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
