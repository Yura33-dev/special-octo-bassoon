'use client';

import { useTranslations } from 'next-intl';

import { formattedDate } from '@/lib/utils';
import { IReviewMapped } from '@/types';

import StarRating from '../../shared/reviews/StarRating';

interface IReviewCardProps {
  review: IReviewMapped;
}

export default function ReviewCard({ review }: IReviewCardProps) {
  const t = useTranslations('ProductPage');

  const date = formattedDate(review.createdAt);

  return (
    <li className='flex-shrink-0 bg-white rounded-md p-4 shadow-sm border border-gray-100 w-full max-w-[700px]'>
      <div className='flex items-center justify-between gap-2 mb-2'>
        <span className='font-semibold text-gray-800'>{review.authorName}</span>
        <span className='text-sm text-gray-400'>{date}</span>
      </div>

      <StarRating value={review.rating} readOnly />

      <p className='mt-3 text-gray-700 text-sm'>{review.comment}</p>

      {review.managerReview && (
        <div className='mt-3 pt-3 border-t border-gray-100'>
          <p className='text-xs font-semibold text-gray-500 mb-1'>
            {t('ReviewCard.ManagerReview')}
          </p>
          <p className='text-gray-700 text-sm'>{review.managerReview}</p>
        </div>
      )}
    </li>
  );
}
