import { Suspense } from 'react';

import BannersPage from '../../_components/banners-page/BannersPage';
import BannersPageSkeleton from '../../_components/banners-page/BannersPageSkeleton';

export const metadata = {
  title: 'ProGround | Банери',
};

export default async function Page() {
  return (
    <Suspense fallback={<BannersPageSkeleton />}>
      <BannersPage />
    </Suspense>
  );
}
