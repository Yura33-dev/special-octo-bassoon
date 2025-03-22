import { notFound } from 'next/navigation';

import Container from '@/components/shared/Container';
import { getPackagingById } from '@/lib/api';
import { formattedPackValue } from '@/lib/utils';

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

  if (!packaging) notFound();

  return (
    <Container>
      <BackButton title='Всі пакування' href='/dashboard/packaging' />
      <PageMainHeader title='Редагувати пакування' className='mb-8' />

      <PackEditForm packaging={packaging} />

      <PackDeleteModal
        packId={packaging._id.toString()}
        packTitle={formattedPackValue(
          packaging.translatedData['uk'].type,
          packaging.translatedData['uk'].measureValue,
          packaging.translatedData['uk'].measureIn
        )}
      />
    </Container>
  );
}
