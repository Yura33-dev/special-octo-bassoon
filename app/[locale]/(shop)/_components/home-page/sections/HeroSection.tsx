import { Suspense } from 'react';

import Container from '@/components/shared/Container';

import MainSwiper from '../main-swiper/MainSwiper';
import MainSwiperSkeleton from '../main-swiper/MainSwiperSkeleton';

export default function HeroSection() {
  return (
    <section className='mt-4'>
      <Container>
        <div className='flex flex-col gap-2 lg:flex-row'>
          <Suspense fallback={<MainSwiperSkeleton />}>
            <MainSwiper />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
