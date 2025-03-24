import { IFilter } from '@/types';

import EditButton from '../shared/EditButton';

interface IFiltersListProps {
  filters: Array<IFilter>;
}

export default function FiltersList({ filters }: IFiltersListProps) {
  if (filters.length < 1) {
    return <h2 className='mt-10 text-xl'>Список фільтрів порожній</h2>;
  }

  return (
    <ul className='mt-10 flex flex-col gap-4'>
      {filters.map(filter => (
        <li key={filter.id} className='bg-teal-700/20 p-4 rounded-md'>
          <div className='flex justify-between'>
            <h2 className='font-semibold uppercase text-base'>
              {filter.title}
            </h2>
            <EditButton
              href={`/dashboard/filters/${filter.slug}`}
              title='Редагувати'
            />
          </div>
          <h3 className='pl-4 text-base'>Опції:</h3>
          <ul className='pl-4 mt-2 flex justify-start flex-wrap gap-2 text-sm'>
            {filter.variants.map(variant => (
              <li
                key={variant.slug}
                className='p-2 bg-primary-dark rounded-md text-white'
              >
                {variant.title}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
