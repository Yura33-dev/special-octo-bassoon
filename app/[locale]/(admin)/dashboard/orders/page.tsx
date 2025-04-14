import { Suspense } from 'react';

import OrdersPage from '../../_components/orders-page/OrdersPage';
import OrdersPageSkeleton from '../../_components/orders-page/OrdersPageSkeleton';

export const metadata = {
  title: 'ProGround | Замовлення',
};

export default async function page() {
  return (
    <Suspense fallback={<OrdersPageSkeleton />}>
      <OrdersPage />
    </Suspense>
  );
}
