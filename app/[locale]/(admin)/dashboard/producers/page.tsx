import { Suspense } from 'react';

import ProducersPage from '../../_components/producers-page/ProducersPage';
import ProducersPageSkeleton from '../../_components/producers-page/ProducersPageSkeleton';

export const metadata = {
  title: 'ProGround | Виробники',
};

export default function Page() {
  return (
    <Suspense fallback={<ProducersPageSkeleton />}>
      <ProducersPage />
    </Suspense>
  );
}
