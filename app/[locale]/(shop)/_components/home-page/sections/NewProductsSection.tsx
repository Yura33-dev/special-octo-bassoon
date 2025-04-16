import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import Container from '@/components/shared/Container';
import CircleLoader from '@/components/shared/loaders/CircleLoader';

import NewProductsSwiper from '../new-products-swiper/NewProductsSwiper';

export default async function NewProductsSection() {
  const t = await getTranslations('MainPage');

  return (
    <section className='mt-20'>
      <Container className='relative'>
        <h2 className='text-3xl font-semibold mb-8'>
          {t('NewProductsSectionTitle')}
        </h2>

        <Suspense
          fallback={
            <div className='max-w-max mx-auto'>
              <CircleLoader />
            </div>
          }
        >
          <NewProductsSwiper />
        </Suspense>
      </Container>
    </section>
  );
}
