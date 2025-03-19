import { Metadata } from 'next';
import { Suspense } from 'react';

import CircleLoader from '@/components/shared/loaders/CircleLoader';
import { getFullCategoryBySlug } from '@/lib/api';
import { locale } from '@/types';

import CategoryDetailsPage from '../../../_components/categories-page/category-page/CategoryDetailsPage';

interface ICategoryDetailsPage {
  params: {
    locale: locale;
    categorySlug: string;
  };
}

export async function generateMetadata({
  params,
}: ICategoryDetailsPage): Promise<Metadata> {
  const category = await getFullCategoryBySlug(
    params.categorySlug,
    params.locale
  );

  return {
    title: `ProGround | ${category?.name[params.locale] ?? 'Сталася помилка'}`,
  };
}

export default async function CategoryPage({ params }: ICategoryDetailsPage) {
  return (
    <Suspense
      fallback={
        <div className='w-full h-screen flex items-center justify-center'>
          <CircleLoader />
        </div>
      }
    >
      <CategoryDetailsPage
        categorySlug={params.categorySlug}
        locale={params.locale}
      />
    </Suspense>
  );
}
