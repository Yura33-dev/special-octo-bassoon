import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { getAllCategories, getPageDataByName } from '@/lib/api';
import { locale } from '@/types';

import BreadCrumbs from '../_components/shared/breadcrumbs/BreadCrumbs';
import CatalogGrid from '../_components/shared/catalogGrid/CatalogGrid';

export default async function CatalogPage() {
  const locale = (await getLocale()) as locale;
  const catalogPageData = await getPageDataByName('CatalogPage');

  const categories = await getAllCategories({
    visible: true,
    main: true,
  });

  if (!catalogPageData || !categories) {
    notFound();
  }

  return (
    <>
      <section className='my-4'>
        <BreadCrumbs
          breadcrumbLinks={['', 'catalog']}
          breadcrumbTitles={
            catalogPageData.translatedData[locale].breadcrumbTitles
          }
        />
      </section>

      <section>
        <Container>
          <h1 className='text-center text-xl md:text-2xl mb-6 md:mb-8'>
            {catalogPageData.translatedData[locale].h1}
          </h1>

          <CatalogGrid categories={categories} />
        </Container>
      </section>
    </>
  );
}
