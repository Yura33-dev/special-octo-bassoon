import { Metadata } from 'next';
import { Suspense } from 'react';

import { getOrderById } from '@/lib/api';

import EditOrderPage from '../../../_components/orders-page/edit-page/EditOrderPage';
import EditOrderPageSkeleton from '../../../_components/orders-page/edit-page/EditOrderPageSkeleton';

interface IPageProps {
  params: {
    locale: string;
    orderId: string;
  };
}

export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {
  const order = await getOrderById(params.orderId);

  return {
    title: `ProGround | Замовлення ${order?.orderNumber ?? 'Сталася помилка'}`,
  };
}

export default function Page({ params }: IPageProps) {
  return (
    <Suspense fallback={<EditOrderPageSkeleton />}>
      <EditOrderPage orderId={params.orderId} />
    </Suspense>
  );
}
