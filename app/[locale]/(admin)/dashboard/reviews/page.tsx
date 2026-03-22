import { Suspense } from 'react';

import ReviewsAdminPage from '../../_components/reviews-page/ReviewsAdminPage';
import ReviewsAdminPageSkeleton from '../../_components/reviews-page/ReviewsAdminPageSkeleton';

export const metadata = {
  title: 'ProGround | Відгуки',
};

interface IPageProps {
  searchParams: { status: 'approved' | 'pending' | undefined; page: string };
}

export default async function page({ searchParams }: IPageProps) {
  return (
    <Suspense fallback={<ReviewsAdminPageSkeleton />}>
      <ReviewsAdminPage searchParams={searchParams} />
    </Suspense>
  );
}
