import { Suspense } from 'react';

import OrdersPage from '../../_components/orders-page/OrdersPage';
import OrdersPageSkeleton from '../../_components/orders-page/OrdersPageSkeleton';

export const metadata = {
  title: 'ProGround | Замовлення',
};

interface IOrdersPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    [key: string]: string | undefined;
  };
}

export default async function page({ searchParams }: IOrdersPageProps) {
  return (
    <Suspense fallback={<OrdersPageSkeleton />}>
      <OrdersPage searchParams={searchParams} />
    </Suspense>
  );
}
