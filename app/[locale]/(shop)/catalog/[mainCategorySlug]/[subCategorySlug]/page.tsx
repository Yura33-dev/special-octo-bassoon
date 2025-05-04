import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';

import Container from '@/components/shared/Container';
import CircleLoader from '@/components/shared/loaders/CircleLoader';
import { routing } from '@/i18n/routing';
import {
  getAllProductsByCategoryId,
  getCategoryBySlug,
  getFiltersFromProducts,
  getPageDataByName,
} from '@/lib/api';
import { DEFAULT_PAGE, PRODUCT_DISPLAY_LIMIT } from '@/lib/constants';
import { locale } from '@/types';

import Filter from '../../../_components/catalog-page/Filter';
import BreadCrumbs from '../../../_components/shared/breadcrumbs/BreadCrumbs';
import ProductsList from '../../../_components/subCategory-page/ProductsList';

interface ISubcategoryPageProps {
  params: {
    mainCategorySlug: string;
    subCategorySlug: string;
  };
  searchParams: {
    page?: string;
    limit?: string;
    [key: string]: string | undefined;
  };
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: ISubcategoryPageProps) {
  const locale = (await getLocale()) as locale;

  const [catalogPageData, category, subcategory] = await Promise.all([
    getPageDataByName('CatalogPage'),
    getCategoryBySlug(params.mainCategorySlug, routing.locales),
    getCategoryBySlug(params.subCategorySlug, routing.locales),
  ]);

  if (!catalogPageData || !category || !subcategory) {
    notFound();
  }

  const page = parseInt(searchParams.page || DEFAULT_PAGE);
  const limit = parseInt(searchParams.limit || PRODUCT_DISPLAY_LIMIT);

  const [{ filters }, { products, paginationData }] = await Promise.all([
    getFiltersFromProducts(locale, { categories: subcategory.id }),
    getAllProductsByCategoryId(subcategory.id, page, limit, searchParams),
  ]);

  const generateBreadCrumbs = [
    '',
    `catalog`,
    `catalog/${category.slug[locale]}`,
    `catalog/${category.slug[locale]}/${subcategory.slug[locale]}`,
  ];

  const generateBreadTitles = [
    ...catalogPageData.translatedData[locale].breadcrumbTitles,
    category.name[locale],
    subcategory.name[locale],
  ];

  return (
    <section className='mt-12'>
      <BreadCrumbs
        breadcrumbLinks={generateBreadCrumbs}
        breadcrumbTitles={generateBreadTitles}
      />

      <Container>
        <div className='flex flex-col items-stretch gap-6 lg:flex-row lg:items-start'>
          <Filter filters={[...filters]} />
          <div className='basis-full flex flex-col gap-4'>
            <h1 className='text-center text-xl md:text-2xl'>
              {catalogPageData.translatedData[locale].h1}
            </h1>

            <Suspense
              fallback={
                <div className='flex justify-center'>
                  <CircleLoader />
                </div>
              }
            >
              <ProductsList
                products={products}
                paginationData={paginationData}
              />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}
