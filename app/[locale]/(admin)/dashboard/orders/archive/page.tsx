import { Suspense } from 'react';

import OrdersArchivePage from '../../../_components/orders-page/archive-page/OrdersArchivePage';
import OrdersPageSkeleton from '../../../_components/orders-page/OrdersPageSkeleton';

export const metadata = {
  title: 'ProGround | Архів замовлень',
};

interface IArchiveOrdersPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    [key: string]: string | undefined;
  };
}

export default async function Page({ searchParams }: IArchiveOrdersPageProps) {
  return (
    <Suspense fallback={<OrdersPageSkeleton />}>
      <OrdersArchivePage searchParams={searchParams} />
    </Suspense>
  );
}
