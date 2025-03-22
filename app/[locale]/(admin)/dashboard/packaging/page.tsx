import { Suspense } from 'react';

import PackagingPage from '../../_components/packaging-page/PackagingPage';
import PackagingPageSkeleton from '../../_components/packaging-page/PackagingPageSkeleton';

export const metadata = {
  title: 'ProGround | Пакування',
};

export default async function Page() {
  return (
    <Suspense fallback={<PackagingPageSkeleton />}>
      <PackagingPage />
    </Suspense>
  );
}
