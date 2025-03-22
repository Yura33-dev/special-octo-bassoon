import { Metadata } from 'next';
import { Suspense } from 'react';

import { getPackagingById } from '@/lib/api';

import EditPackagePage from '../../../_components/packaging-page/edit-page/EditPackagePage';
import EditPackagePageSkeleton from '../../../_components/packaging-page/edit-page/EditPackagePageSkeleton';

interface IPageProps {
  params: {
    locale: string;
    packId: string;
  };
}

export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {
  const pack = await getPackagingById(params.packId);

  return {
    title: `ProGround | Пакування ${pack?.translatedData[params.locale].type ?? 'Сталася помилка'}`,
  };
}

export default async function Page({ params }: IPageProps) {
  return (
    <Suspense fallback={<EditPackagePageSkeleton />}>
      <EditPackagePage packId={params.packId} />
    </Suspense>
  );
}
