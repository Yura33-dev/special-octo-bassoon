'use client';

import { useTranslations } from 'next-intl';

export default function SearchBar() {
  const t = useTranslations('Header');

  return (
    <div className='bg-background py-3 flex justify-center items-center mt-[72px]'>
      <label
        className='input input-sm border-primary flex items-center gap-2
                  focus-within:border-primary focus-within:outline-none
                  focus-within:ring-1 focus-within:ring-primary focus-within:ring-offset-0
                  w-full max-w-xs'
      >
        <input
          type='text'
          className='grow'
          placeholder={t('searchPlaceholder')}
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='h-4 w-4 opacity-70'
        >
          <path
            fillRule='evenodd'
            d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
            clipRule='evenodd'
          />
        </svg>
      </label>
    </div>
  );
}
