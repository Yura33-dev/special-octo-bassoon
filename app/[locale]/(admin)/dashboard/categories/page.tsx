import { Suspense } from 'react';

import CategoriesList from '../../_components/categories-page/CategoriesList';
import TableSkeleton from '../../_components/categories-page/TableSkeleton';

export const metadata = {
  title: 'ProGround | Категорії',
};

export default async function CategoriesPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <CategoriesList />
    </Suspense>
  );
}
