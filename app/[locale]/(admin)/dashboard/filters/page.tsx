import { Suspense } from 'react';

import FiltersPage from '../../_components/filters-page/FiltersPage';
import FiltersPageSkeleton from '../../_components/filters-page/FiltersPageSkeleton';

export const metadata = {
  title: 'ProGround | Фільтри',
};

export default async function Page() {
  return (
    <Suspense fallback={<FiltersPageSkeleton />}>
      <FiltersPage />
    </Suspense>
  );
}
