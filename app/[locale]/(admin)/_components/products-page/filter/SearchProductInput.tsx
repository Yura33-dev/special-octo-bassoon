'use client';

import debounce from 'debounce';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import CircleLoader from '@/components/shared/loaders/CircleLoader';
import { Link, routing } from '@/i18n/routing';
import { getProductsByName } from '@/lib/api';
import { IProductMapped, locale } from '@/types';

export default function SearchProductInput() {
  const locale = useLocale() as locale;

  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Array<IProductMapped>>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className='relative border-b-[1px] pb-4 mb-4'>
      <label className=' border-gray-300 relative flex flex-col gap-2'>
        <h3 className='font-semibold text-lg'>Назва</h3>
        <input
          type='text'
          placeholder='Наприклад: Буряк'
          className='w-full border-[1px] p-1 pr-10 rounded-md text-sm ring-primary focus-within:outline-none focus-within:ring-2'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {loading && (
          <div className='flex justify-center absolute bottom-[5px] right-4'>
            <CircleLoader className='h-5 w-5 border-[3px]' />
          </div>
        )}
      </label>

      {query.length >= 3 && (
        <ul className='absolute top-[70px] left-0 z-[1] bg-white border shadow-md w-full lg:max-w-xs max-h-[300px] overflow-y-auto'>
          {results.length > 0 ? (
            results.map(product => (
              <li key={product.id}>
                <Link
                  href={`/dashboard/products/${product.translatedData[locale].slug}`}
                  key={product.id}
                  className='block p-2 hover:bg-gray-100 text-sm'
                >
                  {product.translatedData[locale].name}
                </Link>
              </li>
            ))
          ) : (
            <p className='p-2 text-gray-500'>Таких товарів немає</p>
          )}
        </ul>
      )}
    </div>
  );
}
