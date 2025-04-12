import { Metadata } from 'next';
import { Suspense } from 'react';

import { getProducerById } from '@/lib/api';

import EditProducerPage from '../../../_components/producers-page/edit-page/EditProducerPage';
import EditProducerPageSkeleton from '../../../_components/producers-page/edit-page/EditProducerPageSkeleton';

interface IPageProps {
  params: {
    locale: string;
    producerId: string;
  };
}

export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {
  const producer = await getProducerById(params.producerId);

  return {
    title: `ProGround | Виробник ${producer?.translatedData[params.locale].title ?? 'Сталася помилка'}`,
  };
}

export default function Page({ params }: IPageProps) {
  return (
    <Suspense fallback={<EditProducerPageSkeleton />}>
      <EditProducerPage producerId={params.producerId} />
    </Suspense>
  );
}
