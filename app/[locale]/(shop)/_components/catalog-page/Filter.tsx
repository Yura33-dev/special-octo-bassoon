'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import {
  Check,
  ChevronDown,
  LoaderCircle,
  SlidersHorizontal,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useRouter } from '@/i18n/routing';
import { useMediaQuery } from '@/lib/hooks';

interface IFilterProps {
  filters: Array<{
    slug: string;
    title: string;
    variants: Array<{ slug: string; title: string }>;
  }>;
}

export default function Filter({ filters }: IFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const t = useTranslations('CatalogPage');

  const [checkedValues, setCheckedValues] = useState<{
    [key: string]: Set<string>;
  }>({});

  const [isLoading, setIsLoading] = useState(false);

  const [isFilterExpand, setIsFilterExpand] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setIsFilterExpand(isDesktop);
  }, [isDesktop]);

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

  const handleFilterMoving = () => {
    setIsFilterExpand(state => !state);
  };

  const filterCount = Object.values(checkedValues)
    .map(set => Array.from(set))
    .flat().length;

  return (
    <motion.aside
      initial={false}
      variants={{ open: { height: 'auto' }, closed: { height: 45 } }}
      animate={isFilterExpand ? 'open' : 'closed'}
      transition={{ duration: 0.3, ease: 'linear' }}
      className={clsx(
        'basis-auto flex-shrink-0 p-2 bg-white/60 border-gray-300 border-[1px] rounded-md lg:mt-12 overflow-hidden',
        'lg:basis-[310px]',
        hasMounted && isDesktop && 'sticky top-20',
        hasMounted && isDesktop && '!h-auto'
      )}
    >
      <div className='flex justify-between items-center mb-5 pb-2 border-b-[1px] border-gray-300'>
        <h3 className='text-lg font-bold relative'>
          {t('FilterTitle')}
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
        <SlidersHorizontal className='hidden lg:block w-5 h-5' />
        <button
          type='button'
          className='lg:hidden w-full flex justify-end items-center'
          onClick={handleFilterMoving}
        >
          <ChevronDown
            className='w-5 h-5'
            focusable='false'
            aria-hidden='true'
          />
        </button>
      </div>

      <div className='lg:max-h-[70vh] lg:overflow-y-auto'>
        {filters.length <= 0 && <h3>{t('NoFilters')}</h3>}

        {filters.length > 0 &&
          filters.map(({ slug, title, variants }) => (
            <div
              key={slug}
              className='flex flex-col mb-4 border-b-[1px] pb-4 pl-2 border-gray-300 last:border-none'
            >
              <h3 className='font-semibold text-lg mb-2'>{title}</h3>

              {variants.map(({ slug: variantSlug, title: variantTitle }) => (
                <label
                  key={variantSlug}
                  className='group flex items-start justify-start gap-2 hover:cursor-pointer'
                >
                  <input
                    disabled={isLoading}
                    type='checkbox'
                    checked={checkedValues[slug]?.has(variantSlug) || false}
                    onChange={e => handleCheckboxChange(e, slug, variantSlug)}
                    className='hidden'
                  />
                  <div
                    className={clsx(
                      'w-4 h-4 flex items-center justify-center shrink-0 border-2 border-gray-400 rounded-[4px] transition',
                      'group-has-[input:checked]:bg-primary group-has-[input:checked]:border-primary relative',
                      isLoading && 'bg-gray-300 cursor-not-allowed'
                    )}
                  >
                    <Check
                      strokeWidth={3}
                      className='w-3 h-3 text-white opacity-0 group-has-[input:checked]:opacity-100 absolute top-0 left-0 transition-opacity'
                    />
                  </div>
                  <span className='text-sm text-gray-800'>{variantTitle}</span>
                </label>
              ))}
            </div>
          ))}
      </div>
      <button
        type='button'
        className='block p-2 bg-primary hover:bg-primary-dark transition-colors text-white text-sm rounded-md mt-4 mx-auto'
        onClick={handleResetFilters}
      >
        {t('ResetFilter')}
      </button>
    </motion.aside>
  );
}
