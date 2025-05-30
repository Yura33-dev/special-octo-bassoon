import { Metadata } from 'next';
import { Suspense } from 'react';

import { routing } from '@/i18n/routing';
import { getCategoryBySlug } from '@/lib/api';
import { locale } from '@/types';

import EditCategoryPage from '../../../_components/categories-page/edit-page/EditCategoryPage';
import EditCategoryPageSkeleton from '../../../_components/categories-page/edit-page/EditCategoryPageSkeleton';

interface ICategoryDetailsPage {
  params: {
    locale: locale;
    categorySlug: string;
  };
}

export async function generateMetadata({
  params,
}: ICategoryDetailsPage): Promise<Metadata> {
  const category = await getCategoryBySlug(
    params.categorySlug,
    routing.locales
  );

  return {
    title: `ProGround | ${category?.name[params.locale] ?? 'Сталася помилка'}`,
  };
}

export default async function CategoryPage({ params }: ICategoryDetailsPage) {
  return (
    <Suspense fallback={<EditCategoryPageSkeleton />}>
      <EditCategoryPage
        categorySlug={params.categorySlug}
        locale={params.locale}
      />
    </Suspense>
  );
}
