import { Suspense } from 'react';

import Container from '@/components/shared/Container';
import CircleLoader from '@/components/shared/loaders/CircleLoader';

import MainSwiper from '../main-swiper/MainSwiper';

export default function HeroSection() {
  return (
    <section className='mt-4'>
      <Container>
        <div className='flex flex-col gap-2 lg:flex-row'>
          <Suspense
            fallback={
              <div className='max-w-max mx-auto'>
                <CircleLoader />
              </div>
            }
          >
            <MainSwiper />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
