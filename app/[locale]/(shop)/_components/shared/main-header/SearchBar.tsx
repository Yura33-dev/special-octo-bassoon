'use client';

import clsx from 'clsx';
import debounce from 'debounce';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import CircleLoader from '@/components/shared/loaders/CircleLoader';
import { Link, routing } from '@/i18n/routing';
import { getProductsByName } from '@/lib/api';
import { formattedPrice } from '@/lib/utils';
import { IProductMapped, locale } from '@/types';

export default function SearchBar() {
  const locale = useLocale() as locale;
  const t = useTranslations('Header');

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
        console.error('Search in shop error:', error);
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

  const handleClickOnItem = () => {
    setTimeout(() => {
      setQuery('');
      setResults([]);
    }, 200);
  };

  return (
    <div
      ref={wrapperRef}
      className='bg-background py-3 flex justify-center items-center mt-[72px] relative'
    >
      <label
        className='input input-sm border-primary flex items-center gap-2
                  focus-within:border-primary focus-within:outline-none
                  focus-within:ring-1 focus-within:ring-primary focus-within:ring-offset-0
                  w-full max-w-xs relative'
      >
        <input
          type='text'
          className='grow'
          placeholder={t('searchPlaceholder')}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        {loading && (
          <div className='flex justify-center absolute top-1/2 -translate-y-1/2 right-12'>
            <CircleLoader className='h-4 w-4 border-[4px]' />
          </div>
        )}
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

      <AnimatePresence>
        {query.length >= 3 && results.length > 0 && isFocused && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              'absolute top-[55px] z-[1] bg-white border shadow-md w-full max-w-[320px] sm:max-w-[500px] overflow-y-auto',
              'rounded-md max-h-[300px] overflow-auto'
            )}
          >
            {results.map(product => (
              <li key={product.id}>
                <Link
                  href={`/catalog/${product.categories[0].slug[locale]}/${product.categories[1].slug[locale]}/${product.translatedData[locale].slug}`}
                  className='flex items-center gap-2 p-2 transition-colors hover:bg-gray-100'
                  onClick={handleClickOnItem}
                >
                  <div className='max-w-16 max-h-16 aspect-square'>
                    <Image
                      src={product.imgUrl}
                      width={100}
                      height={100}
                      alt={product.translatedData[locale].name}
                      className='rounded-md w-full h-full object-cover'
                    />
                  </div>
                  <h3>{product.translatedData[locale].name}, від</h3>
                  <span>
                    {formattedPrice(
                      Math.min(
                        ...product.packaging.items.map(item => {
                          return product.producer.exchangeRate
                            ? item.price * product.producer.exchangeRate
                            : item.price;
                        })
                      )
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </motion.ul>
        )}

        {query.length >= 3 && results.length <= 0 && isFocused && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={clsx(
              'absolute top-[55px] z-[1] bg-white border shadow-md w-full max-w-[320px] sm:max-w-[500px] overflow-y-auto',
              'rounded-md'
            )}
          >
            <p className='p-2 text-gray-500 text-center'>
              {t('noRequestedProducts')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
