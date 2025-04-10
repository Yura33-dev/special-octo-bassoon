import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { getFilterBySlug } from '@/lib/api';
import { locale } from '@/types';

import BackButton from '../../shared/BackButton';
import PageMainHeader from '../../shared/page-elements/PageMainHeader';
import FilterEditForm from '../forms/FilterEditForm';
import FilterDeleteModal from '../modals/FilterDeleteModal';

interface IEditFilterPageProps {
  filterSlug: string;
}

export default async function EditFilterPage({
  filterSlug,
}: IEditFilterPageProps) {
  const locale = (await getLocale()) as locale;
  const filter = await getFilterBySlug(filterSlug);

  if (!filter) notFound();

  return (
    <section>
      <Container>
        <BackButton title='Всі фільтри' href='/dashboard/filters' />
        <PageMainHeader title='Редагувати пакування' className='mb-8' />

        <FilterEditForm filter={filter} />

        <FilterDeleteModal
          filterId={filter.id}
          filterTitle={filter.translatedData[locale].filterTitle}
        />
      </Container>
    </section>
  );
}
