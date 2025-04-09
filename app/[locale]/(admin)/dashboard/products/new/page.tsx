import { Suspense } from 'react';

import NewProductsPage from '../../../_components/products-page/new-page/NewProductsPage';

export const metadata = {
  title: 'ProGround | Новий продукт',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewProductsPage />
    </Suspense>
  );
}
