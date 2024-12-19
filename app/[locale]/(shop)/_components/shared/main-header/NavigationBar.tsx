'use client';

import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

import Container from '@/components/shared/Container';
import { Link } from '@/i18n/routing';
import { useGlobalStore } from '@/providers/globalStore.provider';
import { locale } from '@/types';

export default function NavigationBar() {
  const locale = useLocale() as locale;
  const fetchCategories = useGlobalStore(state => state.fetchCategories);
  const categories = useGlobalStore(state => state.categories);

  useEffect(() => {
    const getCategories = async () => fetchCategories(locale);

    getCategories();
  }, [fetchCategories, locale]);

  return (
    <div className='bg-primary hidden lg:block'>
      <Container>
        <ul className='flex justify-center text-white text-sm [backface-visibility:hidden]'>
          {categories &&
            categories.map(
              ({ slug: slugMain, name, childCategories, id }, index) => (
                <li key={id} className='group relative'>
                  <Link
                    href={`/catalog/${slugMain}`}
                    className='flex items-center p-2 gap-2'
                  >
                    <span>{name}</span>
                    <span>
                      <ChevronDown
                        size={16}
                        className='transition-transform duration-150 group-hover:rotate-180'
                      />
                    </span>
                  </Link>

                  {childCategories && childCategories.length > 0 && (
                    <ul
                      className={clsx(
                        `absolute top-full w-[400px] shadow-md rounded-b-md bg-white text-foreground p-2 hidden`,
                        index === childCategories.length ? 'right-0' : 'left-0',
                        'group-hover:grid grid-cols-3 auto-rows-auto'
                      )}
                    >
                      {childCategories.map(
                        ({ slug: slugChild, name }, index) => (
                          <li key={index} className=''>
                            <Link
                              href={`/catalog/${slugMain}/${slugChild}`}
                              className='flex p-2 rounded-md transition-colors duration-150 hover:bg-accent hover:text-white
                                  '
                            >
                              {name}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </li>
              )
            )}
        </ul>
      </Container>
    </div>
  );
}
