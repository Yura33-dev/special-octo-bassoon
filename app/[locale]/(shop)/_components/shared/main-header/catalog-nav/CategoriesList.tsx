'use client';

import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import Container from '@/components/shared/Container';
import { Link, usePathname } from '@/i18n/routing';
import { useMediaQuery } from '@/lib/hooks';
import { useGlobalStore } from '@/providers/globalStore.provider';
import { ICategoryMapped, locale } from '@/types';

import CatalogNavBarButton from './CatalogNavBarButton';
import CatalogNavBarChildCategories from './CatalogNavBarChildCategories';

interface ICategoriesListProps {
  categories: Array<ICategoryMapped>;
}

export default function CategoriesList({ categories }: ICategoriesListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isOverflowVisible, setIsOverflowVisible] = useState(false);

  const isCategoriesListOpen = useGlobalStore(
    state => state.isCategoriesListOpen
  );
  const categoriesListOpen = useGlobalStore(state => state.categoriesListOpen);
  const categoriesListClose = useGlobalStore(
    state => state.categoriesListClose
  );

  const locale = useLocale() as locale;
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const pathName = usePathname();

  let hoverTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (pathName === '/' && !isMobile) {
      categoriesListOpen();
    } else {
      categoriesListClose();
    }
  }, [pathName, isMobile, categoriesListOpen, categoriesListClose]);

  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isCategoriesListOpen) {
      timeout = setTimeout(() => setIsOverflowVisible(true), 300);
    } else {
      setIsOverflowVisible(false);
    }

    return () => clearTimeout(timeout);
  }, [isCategoriesListOpen]);

  const handleMouseEnter = (id: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => setActiveCategory(id), 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => setActiveCategory(null), 200);
  };

  return (
    <Container>
      <div className='relative'>
        <CatalogNavBarButton />

        <div
          className={clsx(
            `absolute top-full left-0 bg-white rounded-md transition-all duration-300 overflow-hidden
          mt-4
          h-max lg:h-[400px]
          w-full lg:max-w-[310px]`,
            isCategoriesListOpen ? 'max-h-[400px]' : 'max-h-[0px]',
            isOverflowVisible && 'lg:overflow-visible'
          )}
        >
          <div className='h-full w-full py-2 overflow-y-auto overflow-x-visible'>
            <ul className='flex flex-col h-full gap-y-3 text-sm lg:text-base lg:gap-y-0'>
              {categories &&
                categories.map(category => (
                  <li
                    key={category.id}
                    className='px-4'
                    onMouseEnter={() => handleMouseEnter(category.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <h3>
                      <Link
                        href={`/catalog/${category.slug[locale]}`}
                        className='flex items-center lg:justify-between p-2 gap-2 leading-tight'
                      >
                        {category.name[locale]}
                        <span>
                          <ChevronRight
                            size={16}
                            className={clsx(
                              'transition-colors',
                              activeCategory === category.id && 'text-accent'
                            )}
                          />
                        </span>
                      </Link>
                    </h3>

                    {category.childCategories &&
                      category.childCategories.length > 0 && (
                        <CatalogNavBarChildCategories
                          childCategories={category.childCategories}
                          parentCategorySlug={category.slug[locale]}
                          parentCategoryId={category.id}
                          activeCategory={activeCategory}
                        />
                      )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
