'use client';

import { useLocale } from 'next-intl';

import { IProducerMapped, locale } from '@/types';

import EditButton from '../shared/EditButton';

interface IProducersListProps {
  producers: Array<IProducerMapped>;
}

export default function ProducersList({ producers }: IProducersListProps) {
  const locale = useLocale() as locale;

  if (producers.length < 1) {
    return <h2 className='mt-10 text-xl'>Список виробників порожній</h2>;
  }

  return (
    <ul className='mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2'>
      {producers.map(producer => (
        <li
          key={producer.id}
          className='p-4 bg-teal-700/20 text-foreground rounded-md'
        >
          <div className='flex justify-between items-center gap-2'>
            <h2 className='font-semibold text-sm'>
              {producer.translatedData[locale].title}
            </h2>
            {producer.exchangeRate && (
              <h3 className='text-sm'>
                {producer.exchangeRate} ({producer.currency})
              </h3>
            )}
            <EditButton
              href={`/dashboard/producers/${producer.id}`}
              title='Редагувати'
              classNameBtn='mt-0'
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
