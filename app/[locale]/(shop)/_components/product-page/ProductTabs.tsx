'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { IReviewMapped } from '@/types';

import ReviewsList from './reviews/ReviewsList';

interface IInfoTabsProps {
  tabs: {
    descriptionTab: string | null | undefined;
    reviewsTab: {
      reviews: IReviewMapped[];
      total: number;
      productId: string;
    };
    buttons: Array<string>;
  };
}

export default function ProductTabs({ tabs }: IInfoTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs.buttons[0]);

  const t = useTranslations('ProductPage');

  return (
    <>
      <div
        role='tablist'
        className='mt-8 bg-gray-200 rounded-t-md flex gap-2 p-2'
      >
        {tabs.buttons.map(tab => (
          <button
            key={tab}
            role='tab'
            className={clsx(
              'tab transition-colors rounded-md',
              activeTab === tab
                ? 'bg-primary text-white'
                : 'bg-gray-300 text-black'
            )}
            onClick={() => setActiveTab(tab)}
          >
            {t(tab)}
          </button>
        ))}
      </div>

      <div>
        {activeTab === 'Description' && !tabs.descriptionTab && (
          <h4 className='bg-gray-200 p-5 text-lg rounded-b-md'>
            {t('NoDescription')}
          </h4>
        )}

        {activeTab === 'Description' && tabs.descriptionTab && (
          <div className='l-container ql-snow'>
            <div
              className='ql-editor bg-gray-200 p-5 rounded-b-md'
              dangerouslySetInnerHTML={{
                __html: tabs.descriptionTab,
              }}
            ></div>
          </div>
        )}

        {activeTab === 'Reviews' && (
          <ReviewsList
            initialReviews={tabs.reviewsTab.reviews}
            productId={tabs.reviewsTab.productId}
            totalCount={tabs.reviewsTab.total}
          />
        )}
      </div>
    </>
  );
}
