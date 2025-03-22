import { Suspense } from 'react';

import CategoriesPage from '../../_components/categories-page/CategoriesPage';
import CategoriesPageSkeleton from '../../_components/categories-page/CategoriesPageSkeleton';

export const metadata = {
  title: 'ProGround | Категорії',
};

export default async function Page() {
  return (
    <Suspense fallback={<CategoriesPageSkeleton />}>
      <CategoriesPage />
    </Suspense>
  );
}
