'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface IInfoTabsProps {
  tabs: {
    descriptionTab: string | null | undefined;
    reviewsTab: Array<object> | [];
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
          <p
            className=' bg-gray-200 p-5 rounded-b-md'
            dangerouslySetInnerHTML={{ __html: tabs.descriptionTab }}
          ></p>
        )}

        {activeTab === 'Reviews' && tabs.reviewsTab.length === 0 && (
          <h4 className='bg-gray-200 p-5 text-lg rounded-b-md'>
            {t('NoReviews')}
          </h4>
        )}

        {activeTab === 'Reviews' && tabs.reviewsTab.length > 0 && (
          <span className='bg-gray-200 p-5 rounded-b-md'>Reviews List</span> //TODO: reviews list
        )}
      </div>
    </>
  );
}
