'use client';

import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';

import CircleLoader from '@/components/shared/loaders/CircleLoader';
import Pagination from '@/components/shared/Pagination';
import { useRouter } from '@/i18n/routing';
import { DELETE_REVIEW_ID } from '@/lib/constants';
import { useModalStore } from '@/providers';
import { IPagination, IReviewAdminMapped } from '@/types';

import ReviewDeleteModal from './modals/ReviewDeleteModal';
import ReviewAdminCard from './ReviewAdminCard';
import ActionButton from '../shared/ActionButton';

type Tab = 'pending' | 'approved';

interface IReviewsAdminListProps {
  reviews: IReviewAdminMapped[];
  pagination: IPagination;
  activeTab: string | undefined;
}

export default function ReviewsAdminList({
  reviews,
  pagination,
  activeTab,
}: IReviewsAdminListProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedReview, setSelectedReview] =
    useState<IReviewAdminMapped | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const openModal = useModalStore(state => state.openModal);
  const closeModal = useModalStore(state => state.closeModal);

  const handleTabChange = async (tab: Tab) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('status', tab);
      params.set('page', '1');
      router.push(`?${params.toString()}`);
      router.refresh();
    });
  };

  const handlePageChange = (page: number) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('page', page.toString());
      router.push(`?${params.toString()}`);
    });
  };

  const handleDeleteClick = (review: IReviewAdminMapped) => {
    setSelectedReview(review);
    openModal(DELETE_REVIEW_ID);
  };

  const handleModalClose = () => {
    closeModal(DELETE_REVIEW_ID);
    setTimeout(() => setSelectedReview(null), 210);
  };

  return (
    <div className='mt-6'>
      {selectedReview && (
        <ReviewDeleteModal
          reviewId={selectedReview.id}
          authorName={selectedReview.authorName}
          onClose={handleModalClose}
        />
      )}

      {/* Tabs */}
      <div className='flex gap-2 mb-6'>
        <ActionButton
          title='Нові'
          onClick={() => handleTabChange('pending')}
          className={clsx(
            activeTab === 'pending'
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-gray-200 text-gray-700'
          )}
        />

        <ActionButton
          title='Схвалені'
          onClick={() => handleTabChange('approved')}
          className={clsx(
            activeTab === 'approved'
              ? 'bg-primary text-white hover:bg-primary-dark'
              : 'bg-gray-200 text-gray-700'
          )}
        />
      </div>

      <div className='relative'>
        {isPending ? (
          <div className='flex justify-center mt-10'>
            <CircleLoader />
          </div>
        ) : reviews.length === 0 ? (
          <p className='text-gray-500 text-sm'>
            {activeTab === 'pending'
              ? 'Нових відгуків немає'
              : 'Схвалених відгуків немає'}
          </p>
        ) : (
          <ul className='flex flex-col gap-4'>
            {reviews.map(review => (
              <ReviewAdminCard
                key={review.id}
                review={review}
                onDeleteClick={() => handleDeleteClick(review)}
              />
            ))}
          </ul>
        )}

        {pagination && pagination.totalPages > 1 && !isPending && (
          <Pagination
            paginationData={pagination}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
