import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { getPackagingById } from '@/lib/api';
import { formattedPackValue } from '@/lib/utils';
import { locale } from '@/types';

import BackButton from '../../shared/BackButton';
import PageMainHeader from '../../shared/page-elements/PageMainHeader';
import PackEditForm from '../forms/PackEditForm';
import PackDeleteModal from '../modals/PackDeleteModal';

interface IEditPackagePageProps {
  packId: string;
}

export default async function EditPackagePage({
  packId,
}: IEditPackagePageProps) {
  const packaging = await getPackagingById(packId);
  const locale = (await getLocale()) as locale;

  if (!packaging) notFound();

  return (
    <section>
      <Container>
        <BackButton title='Всі пакування' href='/dashboard/packaging' />
        <PageMainHeader title='Редагувати пакування' className='mb-8' />

        <PackEditForm packaging={packaging} />

        <PackDeleteModal
          packId={packaging.id}
          packTitle={formattedPackValue(
            packaging.translatedData[locale].type,
            packaging.translatedData[locale].measureValue,
            packaging.translatedData[locale].measureIn
          )}
        />
      </Container>
    </section>
  );
}
