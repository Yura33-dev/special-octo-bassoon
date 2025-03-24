import { Metadata } from 'next';
import { Suspense } from 'react';

import { getFilterBySlug } from '@/lib/api';

import EditFilterPage from '../../../_components/filters-page/edit-page/EditFilterPage';
import EditFilterPageSkeleton from '../../../_components/filters-page/edit-page/EditFilterPageSkeleton';

interface IPageProps {
  params: {
    locale: string;
    filterSlug: string;
  };
}

export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {
  const filter = await getFilterBySlug(params.filterSlug);

  return {
    title: `ProGround | Фільтр ${filter?.translatedData['uk'].filterTitle ?? 'Сталася помилка'}`,
  };
}

export default function Page({ params }: IPageProps) {
  return (
    <Suspense fallback={<EditFilterPageSkeleton />}>
      <EditFilterPage filterSlug={params.filterSlug} />
    </Suspense>
  );
}
