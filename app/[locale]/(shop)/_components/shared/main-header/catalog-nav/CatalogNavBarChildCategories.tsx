import clsx from 'clsx';

import { Link } from '@/i18n/routing';
import { ICategory } from '@/types';

interface ICatalogNavBarChildCategoriesProps {
  childCategories: Array<ICategory>;
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
        {childCategories.map(({ slug: childCategorySlug, name, id }) => (
          <li key={id} className='leading-tight'>
            <Link
              href={`/catalog/${parentCategorySlug}/${childCategorySlug}`}
              className='flex w-full h-full p-2 rounded-md
            transition-colors duration-150 hover:bg-accent hover:text-white
            '
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
