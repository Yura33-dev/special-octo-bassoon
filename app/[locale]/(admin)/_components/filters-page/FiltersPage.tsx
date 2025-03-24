import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { getAllFilters } from '@/lib/api';
import { ADD_FILTER_ID } from '@/lib/constants';
import { locale } from '@/types';

import FiltersList from './FiltersList';
import AddButton from '../shared/AddButton';
import PageMainHeader from '../shared/page-elements/PageMainHeader';

export default async function FiltersPage() {
  const locale = (await getLocale()) as locale;
  const filters = await getAllFilters(locale);

  return (
    <section>
      <Container>
        <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center justify-between sm:gap-8'>
          <PageMainHeader title='Фільтри товарів' length={filters.length} />
          <AddButton
            type='link'
            modalId={ADD_FILTER_ID}
            href='/dashboard/filters/new'
          />
        </div>

        <FiltersList filters={filters} />
      </Container>
    </section>
  );
}
