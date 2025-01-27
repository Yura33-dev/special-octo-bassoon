import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { getCategoryBySlug, getPageDataByName } from '@/lib/api';
import { locale } from '@/types';

import BreadCrumbs from '../../../_components/shared/breadcrumbs/BreadCrumbs';

interface ISubcategoryPageProps {
  params: {
    mainCategorySlug: string;
    subCategorySlug: string;
  };
}

export default async function SubcategoryPage({
  params,
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

      <section className='mt-4'>
        <Container>subcategoryPage</Container>
      </section>
    </>
  );
}
