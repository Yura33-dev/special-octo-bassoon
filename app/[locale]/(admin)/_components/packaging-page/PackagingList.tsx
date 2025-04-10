'use client';

import { useLocale } from 'next-intl';

import { formattedPackValue } from '@/lib/utils';
import { IPackagingMapped } from '@/types';

import EditButton from '../shared/EditButton';

interface IPackagingListProps {
  packaging: Array<IPackagingMapped>;
}

export default function PackagingList({ packaging }: IPackagingListProps) {
  const locale = useLocale();

  return (
    <ul className='mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2'>
      {packaging.map(pack => (
        <li
          key={pack.id}
          className='p-4 bg-teal-700/20 text-foreground rounded-md'
        >
          <div className='flex justify-between items-center gap-2'>
            <h2 className='font-semibold text-sm'>
              {formattedPackValue(
                pack.translatedData[locale].type,
                pack.translatedData[locale].measureValue,
                pack.translatedData[locale].measureIn
              )}
            </h2>
            <EditButton
              href={`/dashboard/packaging/${pack.id}`}
              title='Редагувати'
              classNameBtn='mt-0'
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
