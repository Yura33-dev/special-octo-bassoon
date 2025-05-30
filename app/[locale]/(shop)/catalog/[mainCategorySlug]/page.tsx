import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { routing } from '@/i18n/routing';
import { getCategoryBySlug, getPageDataByName } from '@/lib/api';
import { locale } from '@/types';

import BreadCrumbs from '../../_components/shared/breadcrumbs/BreadCrumbs';
import CatalogGrid from '../../_components/shared/catalogGrid/CatalogGrid';

interface IMainCategoryPageProps {
  params: {
    mainCategorySlug: string;
  };
}
export default async function MainCategoryPage({
  params,
}: IMainCategoryPageProps) {
  const locale = (await getLocale()) as locale;

  const [catalogPageData, category] = await Promise.all([
    getPageDataByName('CatalogPage'),
    getCategoryBySlug(params.mainCategorySlug, routing.locales),
  ]);

  if (!catalogPageData || !category) {
    notFound();
  }

  const generateBreadCrumbs = [
    '',
    `catalog`,
    `catalog/${category?.slug[locale]}`,
  ];

  const generateBreadTitles = [
    ...catalogPageData.translatedData[locale].breadcrumbTitles,
    category.name[locale],
  ];

  return (
    <section className='mt-4'>
      <BreadCrumbs
        breadcrumbLinks={generateBreadCrumbs}
        breadcrumbTitles={generateBreadTitles}
      />

      <Container>
        <CatalogGrid
          parentSlug={params.mainCategorySlug}
          categories={category.childCategories}
        />
      </Container>
    </section>
  );
}
