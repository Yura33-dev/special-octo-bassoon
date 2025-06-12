'use client';

import clsx from 'clsx';
import debounce from 'debounce';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import CircleLoader from '@/components/shared/loaders/CircleLoader';
import { Link, routing } from '@/i18n/routing';
import { getProductsByName } from '@/lib/api';
import { IProductMapped, locale } from '@/types';

interface ISearchProductInputProps {
  inOrderPage?: boolean;
  onClick?: (product: IProductMapped) => void;
  selectedProducts?: string[];
}

export default function SearchProductInput({
  inOrderPage = false,
  onClick,
  selectedProducts = [],
}: ISearchProductInputProps) {
  const locale = useLocale() as locale;

  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Array<IProductMapped>>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const products = await getProductsByName(query, routing.locales);
        setResults(products);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      }
      setLoading(false);
    };

    const debouncedFetch = debounce(fetchProducts, 200);
    debouncedFetch();

    return () => {
      debouncedFetch.clear();
    };
  }, [query, locale]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className='relative border-b-[1px] pb-4 mb-4'>
      <label className=' border-gray-300 relative flex flex-col gap-2'>
        <h3 className='font-semibold text-lg'>Назва</h3>
        <input
          type='text'
          placeholder='Наприклад: Буряк'
          className={clsx(
            'border-[1px] mx-2 w-full max-w-[calc(100%_-_1rem)] p-1 pr-10 rounded-md text-sm ring-primary focus-within:outline-none focus-within:ring-2'
          )}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        {loading && (
          <div className='flex justify-center absolute bottom-[5px] right-4'>
            <CircleLoader className='h-5 w-5 border-[3px]' />
          </div>
        )}
      </label>

      <AnimatePresence>
        {query.length >= 3 && isFocused && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              'mx-2 absolute top-[70px] left-0 z-[1] bg-white border shadow-md w-full max-w-[calc(100%_-_1rem)] max-h-[300px] overflow-y-auto'
            )}
          >
            {results.length > 0 ? (
              results.map(product => (
                <li key={product.id}>
                  {inOrderPage && onClick ? (
                    <button
                      type='button'
                      className={clsx(
                        'w-full text-left block p-2 hover:bg-gray-100 text-sm',
                        selectedProducts.includes(product.id) &&
                          'bg-teal-700/20 hover:bg-teal-700/20'
                      )}
                      onClick={() => onClick(product)}
                    >
                      <div className='flex gap-2 justify-between'>
                        {product.translatedData[locale].name}

                        {selectedProducts.includes(product.id) && (
                          <CircleCheck className='w-5 h-5 stroke-teal-700' />
                        )}
                      </div>
                    </button>
                  ) : (
                    <Link
                      href={`/dashboard/products/${product.translatedData[locale].slug}`}
                      className='block p-2 hover:bg-gray-100 text-sm'
                    >
                      {product.translatedData[locale].name}
                    </Link>
                  )}
                </li>
              ))
            ) : (
              <li>
                <p className='p-2 text-gray-500'>Товари не знайдені</p>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
