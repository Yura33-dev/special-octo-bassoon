import { Suspense } from 'react';

import AddProductPageSkeleton from '../../../_components/products-page/edit-page/EditProductPageSkeleton';
import NewProductsPage from '../../../_components/products-page/new-page/NewProductsPage';

export const metadata = {
  title: 'ProGround | Новий продукт',
};

export default function Page() {
  return (
    <Suspense fallback={<AddProductPageSkeleton />}>
      <NewProductsPage />
    </Suspense>
  );
}
