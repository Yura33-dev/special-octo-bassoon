import { Suspense } from 'react';

import { locale } from '@/types';

import CatalogNavBar from './catalog-nav/CatalogNavBar';
import CategoriesListSkeleton from './catalog-nav/CategoriesListSkeleton';
import HeaderBar from './HeaderBar';
import SearchBar from './SearchBar';

export default function Header({ locale }: { locale: locale }) {
  return (
    <header className='relative z-10'>
      <HeaderBar />
      <SearchBar />

      <div className='bg-primary relative min-h-[56px]'>
        <Suspense fallback={<CategoriesListSkeleton />}>
          <CatalogNavBar locale={locale} />
        </Suspense>
      </div>
    </header>
  );
}
