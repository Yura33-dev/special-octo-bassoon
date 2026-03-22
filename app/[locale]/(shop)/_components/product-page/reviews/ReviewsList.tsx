'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import CircleLoader from '@/components/shared/loaders/CircleLoader';
import Pagination from '@/components/shared/Pagination';
import { getReviewsByProductId } from '@/lib/api';
import { PRODUCT_REVIEWS_DISPLAY_LIMIT } from '@/lib/constants';
import { IPagination, IReviewMapped } from '@/types';

import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';

interface IReviewsListProps {
  initialReviews: IReviewMapped[];
  productId: string;
  totalCount: number;
}

export default function ReviewsList({
  initialReviews,
  productId,
  totalCount,
}: IReviewsListProps) {
  const t = useTranslations('ProductPage');

  const [reviews, setReviews] = useState<IReviewMapped[]>(initialReviews);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    perPage: PRODUCT_REVIEWS_DISPLAY_LIMIT,
    totalItems: totalCount,
    totalPages: Math.ceil(totalCount / PRODUCT_REVIEWS_DISPLAY_LIMIT),
    hasNextPage: totalCount > PRODUCT_REVIEWS_DISPLAY_LIMIT,
    hasPrevPage: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (page: number) => {
    setIsLoading(true);
    try {
      const result = await getReviewsByProductId(
        productId,
        page,
        PRODUCT_REVIEWS_DISPLAY_LIMIT
      );
      setReviews(result.reviews);
      setPagination(result.pagination);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-gray-200 p-5 rounded-b-md flex flex-col gap-6'>
      {reviews.length === 0 ? (
        <h4 className='text-base'>{t('NoReviews')}</h4>
      ) : (
        <>
          <div className='relative'>
            <ul className='flex flex-col gap-4 items-center'>
              {reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </ul>

            {isLoading && (
              <div
                className='absolute inset-0 flex items-center justify-center rounded-md bg-gray-200/70 z-10'
                aria-busy='true'
                aria-live='polite'
              >
                <CircleLoader />
              </div>
            )}

            {pagination.totalPages > 1 && (
              <Pagination
                paginationData={pagination}
                handlePageChange={handlePageChange}
              />
            )}
          </div>
        </>
      )}

      <ReviewForm productId={productId} />
    </div>
  );
}
