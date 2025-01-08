import { Suspense } from 'react';

import Container from '@/components/shared/Container';
import CategoriesLoadingButton from '@/components/shared/loaders/CategoriesLoadingButton';
import { locale } from '@/types';

import CatalogNavBar from './catalog-nav/CatalogNavBar';
import HeaderBar from './HeaderBar';
import SearchBar from './SearchBar';

interface IHeaderProps {
  locale: locale;
}

export default function Header({ locale }: IHeaderProps) {
  return (
    <header className='relative z-10'>
      <HeaderBar />
      <SearchBar />

      <div className='bg-primary'>
        <Container className='relative'>
          <Suspense fallback={<CategoriesLoadingButton />}>
            <CatalogNavBar locale={locale} />
          </Suspense>
        </Container>
      </div>
    </header>
  );
}
