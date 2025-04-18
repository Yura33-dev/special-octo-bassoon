import Container from '@/components/shared/Container';

import MainSwiper from '../main-swiper/MainSwiper';

export default function HeroSection() {
  return (
    <section className='mt-4'>
      <Container>
        <div className='flex flex-col gap-2 lg:flex-row'>
          <MainSwiper />
        </div>
      </Container>
    </section>
  );
}
