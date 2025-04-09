'use client';

import clsx from 'clsx';
import { SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useRouter } from '@/i18n/routing';

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
  }, [searchParams, filters]);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterSlug: string,
    variantSlug: string
  ) => {
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

  const filterCount = Object.values(checkedValues)
    .map(set => Array.from(set))
    .flat().length;

  return (
    <div
      className={clsx(
        'basis-auto flex-shrink-0 p-2 bg-white/60 border-gray-300 border-[1px] rounded-md lg:basis-[280px] h-auto lg:max-h-[80vh] lg:overflow-y-auto lg:sticky lg:top-20'
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
        </h3>
        <SlidersHorizontal className='w-5 h-5' />
      </div>

      <SearchProductInput />

      {filters.length <= 0 && <h3>Немає доступних фільтрів</h3>}

      {filters.length > 0 &&
        filters.map(({ slug, title, variants }) => (
          <div
            key={slug}
            className='flex flex-row flex-wrap gap-4 items-center lg:gap-0 lg:items-start lg:flex-col mb-4 border-b-[1px] pb-4 pl-2 border-gray-300 last:border-none'
          >
            <h3 className='font-semibold text-lg lg:mb-2'>{title}</h3>

            {variants.map(({ slug: variantSlug, title: variantTitle }) => (
              <label
                key={variantSlug}
                className='flex items-center justify-start gap-2 w-max hover:cursor-pointer'
              >
                <input
                  type='checkbox'
                  checked={checkedValues[slug]?.has(variantSlug) || false}
                  onChange={e => handleCheckboxChange(e, slug, variantSlug)}
                  className='hover:cursor-pointer'
                />
                {variantTitle}
              </label>
            ))}
          </div>
        ))}
    </div>
  );
}
