'use client';

import clsx from 'clsx';
import { LoaderCircle, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useRouter } from '@/i18n/routing';

import FilterItem from './FilterItem';
import SearchProductInput from './SearchProductInput';

interface IAdminFilterProps {
  filters: Array<{
    slug: string;
    title: string;
    variants: Array<{ slug: string; title: string }>;
  }>;
}

export default function AdminFilter({ filters }: IAdminFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [checkedValues, setCheckedValues] = useState<{
    [key: string]: Set<string>;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const newCheckedValues: { [key: string]: Set<string> } = {};

    filters.forEach(({ slug }) => {
      const filterValues = params.getAll(slug);
      if (filterValues.length > 0) {
        newCheckedValues[slug] = new Set(filterValues);
      }
    });

    setCheckedValues(newCheckedValues);

    setIsLoading(false);
  }, [searchParams, filters]);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterSlug: string,
    variantSlug: string
  ) => {
    setIsLoading(true);

    const params = new URLSearchParams(searchParams.toString());
    const existingValues = params.getAll(filterSlug);

    let newValues: string[] = [...existingValues];

    if (e.target.checked) {
      if (!newValues.includes(variantSlug)) {
        newValues.push(variantSlug);
      }
    } else {
      newValues = newValues.filter(v => v !== variantSlug);
    }

    params.delete(filterSlug);

    newValues.forEach(value => params.append(filterSlug, value));

    params.set('page', '1');
    router.replace(`?${params.toString()}`, { scroll: false });

    setCheckedValues(prev => {
      const newChecked = new Set(prev[filterSlug] || []);
      if (e.target.checked) {
        newChecked.add(variantSlug);
      } else {
        newChecked.delete(variantSlug);
      }

      return {
        ...prev,
        [filterSlug]: newChecked,
      };
    });
  };

  const handleResetFilters = () => {
    setIsLoading(true);

    const params = new URLSearchParams(searchParams.toString());

    filters.forEach(({ slug }) => {
      params.delete(slug);
    });

    params.delete('page');

    router.replace(`?${params.toString()}`, { scroll: false });

    setCheckedValues({});
  };

  const filterCount = Object.values(checkedValues)
    .map(set => Array.from(set))
    .flat().length;

  const subCategories = filters.find(filter => filter.title === 'Підкатегорія');
  const restFilters = filters.filter(filter => filter.title !== 'Підкатегорія');

  return (
    <aside
      className={clsx(
        'basis-auto flex-shrink-0 p-2 bg-white/60 border-gray-300 border-[1px] rounded-md',
        'lg:basis-[280px] h-auto lg:sticky lg:top-20',
        'relative'
      )}
    >
      <div className='flex justify-between items-center mb-5 pb-2 border-b-[1px] border-gray-300'>
        <h3 className='text-lg font-bold relative'>
          Фільтр товарів
          <span
            className={clsx(
              'w-4 h-4 rounded-full bg-primary text-white text-xs font-thin justify-center items-center absolute top-0 -right-4',
              filterCount > 0 ? 'flex' : 'hidden'
            )}
          >
            {filterCount}
          </span>
          {isLoading && (
            <LoaderCircle className='w-5 h-5 text-accent absolute top-[6px] -right-[40px] animate-spin ' />
          )}
        </h3>
        <SlidersHorizontal className='w-5 h-5' />
      </div>

      <div className='lg:max-h-[65vh] lg:overflow-y-auto'>
        <SearchProductInput />

        {filters.length <= 0 && <h3>Немає доступних фільтрів</h3>}

        {restFilters.length > 0 && (
          <ul>
            {subCategories && (
              <FilterItem
                filter={subCategories}
                checkedValues={checkedValues}
                handleCheckboxChange={handleCheckboxChange}
                disabled={isLoading}
              />
            )}

            {restFilters.map(filter => (
              <FilterItem
                key={filter.slug}
                filter={filter}
                checkedValues={checkedValues}
                handleCheckboxChange={handleCheckboxChange}
                disabled={isLoading}
              />
            ))}
          </ul>
        )}
      </div>

      <button
        type='button'
        className='block p-2 bg-primary hover:bg-primary-dark transition-colors text-white text-sm rounded-md mt-4 mx-auto'
        onClick={handleResetFilters}
      >
        Скинути
      </button>
    </aside>
  );
}
