import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { getAllProducers } from '@/lib/api';
import { ADD_PRODUCER_ID } from '@/lib/constants';
import { locale } from '@/types';

import ProducersList from './ProducersList';
import AddButton from '../shared/AddButton';
import PageMainHeader from '../shared/page-elements/PageMainHeader';

export default async function ProducersPage() {
  const locale = (await getLocale()) as locale;
  const producers = await getAllProducers(locale);

  return (
    <section>
      <Container>
        <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center justify-between sm:gap-8'>
          <PageMainHeader title='Виробники' length={producers.length} />
          <AddButton
            modalId={ADD_PRODUCER_ID}
            type='link'
            href='/dashboard/producers/new'
          />
        </div>

        <ProducersList producers={producers} />
      </Container>
    </section>
  );
}
