import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';

import Container from '@/components/shared/Container';
import CircleLoader from '@/components/shared/loaders/CircleLoader';
import {
  getAllProductsByCategoryId,
  getCategoryBySlug,
  getFilters,
  getPageDataByName,
} from '@/lib/api';
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
    getPageDataByName('CatalogPage', locale),
    getCategoryBySlug(params.mainCategorySlug, locale),
    getCategoryBySlug(params.subCategorySlug, locale),
  ]);

  if (!catalogPageData || !category || !subcategory) {
    notFound();
  }

  const page = parseInt(searchParams.page || '1');
  const limit = parseInt(searchParams.limit || '9');

  const [{ filters }, { products, paginationData }] = await Promise.all([
    getFilters(locale, subcategory.id),
    getAllProductsByCategoryId(
      locale,
      subcategory.id,
      page,
      limit,
      searchParams
    ),
  ]);

  const generateBreadCrumbs = [
    '',
    `catalog`,
    `catalog/${category.slug}`,
    `catalog/${category.slug}/${subcategory.slug}`,
  ];

  const generateBreadTitles = [
    ...catalogPageData.data.breadcrumbTitles,
    category.name,
    subcategory.name,
  ];

  return (
    <>
      <BreadCrumbs
        breadcrumbLinks={generateBreadCrumbs}
        breadcrumbTitles={generateBreadTitles}
      />

      <section className='mt-12'>
        <Container>
          <div className='flex flex-col items-stretch gap-6 lg:flex-row lg:items-start'>
            <Filter filters={[...filters]} />
            <div className='basis-full flex flex-col gap-4'>
              <h1 className='text-center text-xl md:text-2xl'>
                {catalogPageData.data.h1}
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
    </>
  );
}
