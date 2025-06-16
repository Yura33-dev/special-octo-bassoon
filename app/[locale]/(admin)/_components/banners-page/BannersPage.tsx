import Container from '@/components/shared/Container';
import { getAllSlides } from '@/lib/api/slides/getAllSlides';
import { ADD_BANNER_ID } from '@/lib/constants';

import BannersList from './BannersList';
import AddButton from '../shared/AddButton';
import PageMainHeader from '../shared/page-elements/PageMainHeader';

export default async function BannersPage() {
  const slides = await getAllSlides();

  return (
    <section>
      <Container>
        <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center justify-between sm:gap-8'>
          <PageMainHeader title='Рекламні банери' length={slides.length} />
          <AddButton
            modalId={ADD_BANNER_ID}
            type='link'
            href='/dashboard/banners/new'
          />
        </div>

        <BannersList slides={slides} />
      </Container>
    </section>
  );
}
