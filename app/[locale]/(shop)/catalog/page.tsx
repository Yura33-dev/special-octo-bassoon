import Container from '@/components/shared/Container';
import { Link } from '@/i18n/routing';
import { locale } from '@/types';

import CatalogGrid from '../_components/catalog-page/CatalogGrid';
import Filter from '../_components/catalog-page/Filter';
import Pagination from '../_components/catalog-page/Pagination';

export default function CatalogPage({
  params,
  searchParams,
}: {
  params: { locale: locale };
  searchParams: { page?: string };
}) {
  const { locale } = params;
  const page = parseInt(searchParams.page || '1');

  return (
    <>
      <section className='mt-4'>
        <Container>
          <div className='breadcrumbs text-base'>
            <ul>
              <li>
                <Link href='/'>Головна</Link>
              </li>
              <li>Каталог</li>
            </ul>
          </div>
        </Container>
      </section>

      <section className='mt-12'>
        <Container>
          <h1 className='text-center text-xl md:text-2xl'>
            Каталог продуктів <span className='uppercase'>Graund-A</span>
          </h1>

          <div className='flex flex-col items-stretch gap-6 lg:flex-row lg:items-start'>
            <Filter />
            <div>
              <div>Sorting</div>
              <CatalogGrid locale={locale} page={page} />
            </div>
          </div>
        </Container>
      </section>

      <Pagination />
    </>
  );
}