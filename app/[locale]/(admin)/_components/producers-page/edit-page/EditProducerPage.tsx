import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { getProducerById } from '@/lib/api';
import { locale } from '@/types';

import BackButton from '../../shared/BackButton';
import PageMainHeader from '../../shared/page-elements/PageMainHeader';
import ProducerForm from '../forms/ProducerForm';
import ProducerDeleteModal from '../modals/ProducerDeleteModal';

interface IEditProducerPageProps {
  producerId: string;
}

export default async function EditProducerPage({
  producerId,
}: IEditProducerPageProps) {
  const producer = await getProducerById(producerId);
  const locale = (await getLocale()) as locale;

  if (!producer) notFound();

  return (
    <section>
      <Container>
        <BackButton title='Всі виробники' href='/dashboard/producers' />
        <PageMainHeader title='Редагувати виробника' className='mb-8' />

        <ProducerForm producer={producer} />

        <ProducerDeleteModal
          producerId={producerId}
          producerTitle={producer.translatedData[locale].title}
        />
      </Container>
    </section>
  );
}
