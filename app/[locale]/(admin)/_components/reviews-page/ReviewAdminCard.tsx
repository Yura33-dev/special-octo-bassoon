'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { toast } from 'sonner';

import StarRating from '@/app/[locale]/(shop)/_components/shared/reviews/StarRating';
import { approveReviewById } from '@/lib/api';
import { formattedDate } from '@/lib/utils';
import { IReviewAdminMapped } from '@/types';

import ManagerReview from './reviews-card/ManagerReview';
import ReviewCardHeader from './reviews-card/ReviewCardHeader';
import ActionButton from '../shared/ActionButton';
import DeleteActionButton from '../shared/DeleteActionButton';

interface IReviewAdminCardProps {
  review: IReviewAdminMapped;
  onDeleteClick: () => void;
}

export default function ReviewAdminCard({
  review,
  onDeleteClick,
}: IReviewAdminCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const date = formattedDate(review.createdAt);

  const handleToggle = async () => {
    try {
      setIsLoading(true);
      await approveReviewById(review.id, !review.approved);
      toast.success(
        review.approved ? 'Відгук знято з публікації' : 'Відгук схвалено'
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Виникла помилка. Спробуйте ще раз.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li className='bg-white rounded-md p-4 border border-gray-200 flex flex-col gap-3'>
      <ReviewCardHeader
        authorName={review.authorName}
        authorContact={review.authorContact}
        date={date}
        approved={review.approved}
        product={review.product}
      />

      <StarRating value={review.rating} readOnly />

      <p className='text-sm text-gray-700'>{review.comment}</p>

      {review.managerReview && <ManagerReview text={review.managerReview} />}

      <div className='flex gap-2 pt-2 border-t border-gray-100'>
        <ActionButton
          title={review.approved ? 'Зняти публікацію' : 'Схвалити'}
          onClick={handleToggle}
          disabled={isLoading}
          className={clsx(
            'text-white',
            review.approved
              ? 'bg-gray-400 hover:bg-gray-500'
              : 'bg-primary hover:bg-primary-dark'
          )}
        />

        <DeleteActionButton disable={isLoading} onClick={onDeleteClick} />
      </div>
    </li>
  );
}
