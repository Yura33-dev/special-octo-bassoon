'use client';

import clsx from 'clsx';
import { useLocale } from 'next-intl';

import { Link } from '@/i18n/routing';
import { locale } from '@/types';

interface ICatalogNavBarChildCategoriesProps {
  childCategories: Array<{
    id: string;
    name: { [key: string]: string };
    slug: { [key: string]: string };
    sortOrder: number;
    visible: boolean;
    featured: boolean;
    image: string;
    main: boolean;
    updatedAt: string | null;
    createdAt: string | null;
  }>;
  parentCategorySlug: string;
  parentCategoryId: string;
  activeCategory: string | null;
}

export default function CatalogNavBarChildCategories({
  childCategories,
  parentCategorySlug,
  parentCategoryId,
  activeCategory,
}: ICatalogNavBarChildCategoriesProps) {
  const locale = useLocale() as locale;
  return (
    <div
      className={clsx(
        'absolute top-0 z-[2] bg-white rounded-md text-foreground',
        'w-[35vw] h-full transition-all opacity-0 pointer-events-none overflow-auto ml-1',

        activeCategory === parentCategoryId && childCategories.length > 0
          ? 'opacity-100 pointer-events-auto left-full'
          : 'opacity-0 pointer-events-none left-3/4'
      )}
    >
      <ul className={clsx(`p-2`, 'grid grid-cols-3 auto-rows-auto')}>
        {childCategories.map(category => (
          <li key={category.id} className='leading-tight'>
            <Link
              href={`/catalog/${parentCategorySlug}/${category.slug[locale]}`}
              className='flex w-full h-full p-2 rounded-md transition-colors duration-150 hover:bg-accent hover:text-white'
            >
              {category.name[locale]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
