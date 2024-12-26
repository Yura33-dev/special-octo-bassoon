'use client';

import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import Container from '@/components/shared/Container';
import Skeleton from '@/components/shared/loaders/Skeleton';
import { Link, usePathname } from '@/i18n/routing';
import { useMediaQuery } from '@/lib/hooks';
import { useGlobalStore } from '@/providers/globalStore.provider';
import { locale } from '@/types';

import CatalogNavBarButton from './CatalogNavBarButton';
import CatalogNavBarChildCategories from './CatalogNavBarChildCategories';

export default function CatalogNavBar() {
  const locale = useLocale() as locale;
  const fetchCategories = useGlobalStore(state => state.fetchCategories);
  const categories = useGlobalStore(state => state.categories);
  const categoriesAreLoading = useGlobalStore(
    state => state.categoriesAreLoading
  );

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [areCategoriesOpened, setAreCategoriesOpened] = useState(false);
  const [isOverflowVisible, setIsOverflowVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const isMobile = useMediaQuery('(max-width: 1024px)');

  const pathName = usePathname();

  let hoverTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (pathName === '/' && !isMobile) {
      setAreCategoriesOpened(true);
      setIsButtonDisabled(true);
    } else {
      setAreCategoriesOpened(false);
      setIsButtonDisabled(false);
    }
  }, [pathName, isMobile]);

  useEffect(() => {
    const getCategories = async () => fetchCategories(locale);

    getCategories();
  }, [fetchCategories, locale]);

  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (areCategoriesOpened) {
      timeout = setTimeout(() => setIsOverflowVisible(true), 300);
    } else {
      setIsOverflowVisible(false);
    }

    return () => clearTimeout(timeout);
  }, [areCategoriesOpened]);

  const handleMouseEnter = (id: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => setActiveCategory(id), 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => setActiveCategory(null), 200);
  };

  const toggleCategoriesList = () => setAreCategoriesOpened(state => !state);

  return (
    <div className='bg-primary'>
      <Container className='relative'>
        <CatalogNavBarButton
          toggleCategoriesList={toggleCategoriesList}
          isButtonDisabled={isButtonDisabled}
        />

        <div
          className={clsx(
            `absolute top-full left-0 lg:left-4
              mt-4 bg-white rounded-md transition-all duration-300 overflow-hidden
              h-max lg:h-[400px] 
              w-full lg:max-w-[310px]`,
            areCategoriesOpened ? 'max-h-[400px]' : 'max-h-[0px]',
            isOverflowVisible && 'lg:overflow-visible'
          )}
        >
          {categoriesAreLoading ? (
            <Skeleton
              icon={<ChevronRight size={16} className='animate-pulse' />}
              quantity={5}
              widths={['w-1/2', 'w-2/3', 'w-1/3', 'w-1/2', 'w-10/12']}
              wrapperStyle='flex flex-col space-y-5 p-5'
              className='h-5'
            />
          ) : (
            <ul className='flex flex-col h-full relative py-2 gap-y-3 lg:gap-y-0'>
              {categories &&
                categories.map(({ slug, name, childCategories, id }) => (
                  <li
                    key={id}
                    className='px-4'
                    onMouseEnter={() => handleMouseEnter(id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <h3>
                      <Link
                        href={`/catalog/${slug}`}
                        className='flex items-center lg:justify-between p-2 gap-2 leading-tight'
                      >
                        {name}
                        <span>
                          <ChevronRight
                            size={16}
                            className={clsx(
                              'transition-colors',
                              activeCategory === id && 'text-accent'
                            )}
                          />
                        </span>
                      </Link>
                    </h3>

                    {childCategories && childCategories.length > 0 && (
                      <CatalogNavBarChildCategories
                        childCategories={childCategories}
                        parentCategorySlug={slug}
                        parentCategoryId={id}
                        activeCategory={activeCategory}
                      />
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </Container>
    </div>
  );
}
