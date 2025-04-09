import { CirclePlus } from 'lucide-react';
import { getLocale } from 'next-intl/server';

import { getAllPackaging } from '@/lib/api';
import { formattedPackValue } from '@/lib/utils';
import { locale } from '@/types';

export default async function PackagingList() {
  const locale = (await getLocale()) as locale;
  const packaging = await getAllPackaging(locale);

  return (
    <ul className='grid auto-rows-[56px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
      {packaging.map(pack => (
        <li
          key={pack.id}
          className='flex items-center justify-between p-1 transition-colors rounded-md bg-teal-700/30 hover:bg-teal-700/60
                        focus-within:bg-teal-700/60 focus-within:outline-none'
        >
          <div className='flex justify-between items-center gap-4'>
            <h3 className='text-sm'>
              {formattedPackValue(
                pack.translatedData[locale].type,
                pack.translatedData[locale].measureValue,
                pack.translatedData[locale].measureIn
              )}
            </h3>
          </div>
        </li>
      ))}

      <li className='p-1 rounded-md bg-teal-700/30 transition-colors hover:bg-teal-700/70 hover:text-white hover:cursor-pointer'>
        <button
          type='button'
          className='flex justify-center items-center w-full h-full gap-2'
        >
          <CirclePlus className='w-6 h-6' />
        </button>
      </li>
    </ul>
  );
}
