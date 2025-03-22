import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { getAllPackaging } from '@/lib/api';
import { ADD_PACKAGING_ID } from '@/lib/constants';
import { locale } from '@/types';

import PackagingList from './PackagingList';
import AddButton from '../shared/AddButton';
import PageMainHeader from '../shared/page-elements/PageMainHeader';

export const metadata = {
  title: 'ProGround | Пакування',
};

export default async function PackagingPage() {
  const locale = await getLocale();
  const packaging = await getAllPackaging(locale as locale);

  return (
    <section>
      <Container>
        <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center justify-between sm:gap-8'>
          <PageMainHeader
            title='Пакування продуктів'
            length={packaging.length}
          />
          <AddButton
            modalId={ADD_PACKAGING_ID}
            type='link'
            href='/dashboard/packaging/new'
          />
        </div>

        <PackagingList packaging={packaging} />
      </Container>
    </section>
  );
}
