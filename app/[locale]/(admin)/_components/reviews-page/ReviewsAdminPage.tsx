import Container from '@/components/shared/Container';
import { getAllReviews, getPendingReviewsCount } from '@/lib/api';

import ReviewsAdminList from './ReviewsAdminList';

interface IReviewsAdminPage {
  searchParams: { status: 'approved' | 'pending' | undefined; page: string };
}

export default async function ReviewsAdminPage({
  searchParams,
}: IReviewsAdminPage) {
  const { status, page } = searchParams;

  const [{ reviews, pagination }, pendingCount] = await Promise.all([
    status && status === 'pending'
      ? getAllReviews(false, parseInt(page, 10) || 1)
      : getAllReviews(true, parseInt(page, 10)) || 1,
    getPendingReviewsCount(),
  ]);

  return (
    <section>
      <Container>
        <div className='flex items-center gap-3'>
          <h1 className='text-2xl font-semibold'>Відгуки</h1>
          {pendingCount > 0 && (
            <span className='bg-red-500 text-white text-sm font-medium px-2.5 py-0.5 rounded-full'>
              {pendingCount} нових
            </span>
          )}
        </div>

        <ReviewsAdminList
          reviews={reviews}
          pagination={pagination}
          activeTab={status}
        />
      </Container>
    </section>
  );
}
