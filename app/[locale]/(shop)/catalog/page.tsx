import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';

import Container from '@/components/shared/Container';
import CircleLoader from '@/components/shared/loaders/CircleLoader';
import { getPageDataByName } from '@/lib/api';
import { locale } from '@/types';

import Catalog from '../_components/catalog-page/Catalog';
import Filter from '../_components/catalog-page/Filter';
import BreadCrumbs from '../_components/shared/breadcrumbs/BreadCrumbs';

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const locale = (await getLocale()) as locale;
  const catalogPageData = await getPageDataByName('CatalogPage', locale);
  const page = parseInt(searchParams.page || '1');

  if (!catalogPageData) {
    notFound();
  }

  return (
    <>
      <BreadCrumbs
        breadcrumbLinks={['', 'catalog']}
        breadcrumbTitles={catalogPageData.data.breadcrumbTitles}
      />

      <section className='mt-12'>
        <Container>
          <div className='flex flex-col items-stretch gap-6 lg:flex-row lg:items-start'>
            <Filter />
            <div className='basis-full flex flex-col gap-4'>
              <h1 className='text-center text-xl md:text-2xl'>
                {catalogPageData.data.h1}
              </h1>

              <div>Sorting</div>

              <Suspense
                fallback={
                  <div className='flex justify-center'>
                    <CircleLoader />
                  </div>
                }
              >
                <Catalog page={page} />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
