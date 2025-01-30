import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import {
  getCategoryBySlug,
  getChildCategoriesByParentSlug,
  getPageDataByName,
} from '@/lib/api';
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
    getPageDataByName('CatalogPage', locale),
    getCategoryBySlug(params.mainCategorySlug, locale),
  ]);

  if (!catalogPageData || !category) {
    notFound();
  }

  const subCategories = await getChildCategoriesByParentSlug(
    category.slug,
    locale
  );

  const generateBreadCrumbs = ['', `catalog`, `catalog/${category?.slug}`];

  const generateBreadTitles = [
    ...catalogPageData.data.breadcrumbTitles,
    category.name,
  ];

  return (
    <>
      <BreadCrumbs
        breadcrumbLinks={generateBreadCrumbs}
        breadcrumbTitles={generateBreadTitles}
      />

      <section className='mt-4'>
        <Container>
          <CatalogGrid categories={subCategories} />
        </Container>
      </section>
    </>
  );
}
