import { Suspense } from 'react';

import Container from '@/components/shared/Container';
import CircleLoader from '@/components/shared/loaders/CircleLoader';

import About from './_components/home-page/about-us/About';
import Benefits from './_components/home-page/about-us/Benefits';
import GridCategories from './_components/home-page/catalog-categories/GridCategories';
import Faq from './_components/home-page/faq/Faq';
import MainSwiper from './_components/home-page/main-swiper/MainSwiper';
import NewProductsSwiper from './_components/home-page/new-products-swiper/NewProductsSwiper';
import ConsultingBanner from './_components/shared/consulting-banner/ConsultingBanner';

export default function ShopHome() {
  return (
    <>
      <h1 className='sr-only'>
        ProGround - найкращий магазин насінин в Україні
      </h1>

      <section className='mt-4'>
        <Container>
          <Suspense
            fallback={
              <div className='max-w-max mx-auto'>
                <CircleLoader />
              </div>
            }
          >
            <MainSwiper />
          </Suspense>
        </Container>
      </section>

      <section className='mt-20'>
        <Container>
          <h2 className='sr-only'>Категорії та продукти</h2>
          <GridCategories />
        </Container>
      </section>

      <section className='mt-20'>
        <Container className='relative'>
          <h2 className='text-3xl font-semibold mb-8'>Новинки</h2>
          <NewProductsSwiper />
        </Container>
      </section>

      <ConsultingBanner />

      <section className='mt-20'>
        <Container>
          <h2 className='text-3xl font-semibold'>Про нас</h2>
          <About />
          <Benefits />
        </Container>
      </section>

      <section className='mt-20'>
        <Container>
          <h2 className='text-3xl font-semibold'>Запитання та відповіді</h2>
          <Faq />
        </Container>
      </section>
    </>
  );
}
