import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import Container from '@/components/shared/Container';
import CircleLoader from '@/components/shared/loaders/CircleLoader';
import { getPageData } from '@/lib/api/pages/getPageData';
import { locale } from '@/types';

import About from './_components/home-page/about-us/About';
import Benefits from './_components/home-page/about-us/Benefits';
import GridCategories from './_components/home-page/catalog-categories/GridCategories';
import Faq from './_components/home-page/faq/Faq';
import MainSwiper from './_components/home-page/main-swiper/MainSwiper';
import NewProductsSwiper from './_components/home-page/new-products-swiper/NewProductsSwiper';
import ConsultingBanner from './_components/shared/consulting-banner/ConsultingBanner';

export default async function ShopHome({
  params: { locale },
}: {
  params: { locale: locale };
}) {
  const pageData = await getPageData('MainPage', locale);
  const t = await getTranslations('MainPage');

  return (
    <>
      <h1 className='sr-only'>{pageData?.translatedData.h1}</h1>

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

      <section className='mt-20'>
        <Container>
          <h2 className='sr-only'>{t('CategoriesSectionTitle')}</h2>
          <GridCategories />
        </Container>
      </section>

      <section className='mt-20'>
        <Container className='relative'>
          <h2 className='text-3xl font-semibold mb-8'>
            {t('NewProductsSectionTitle')}
          </h2>
          <NewProductsSwiper />
        </Container>
      </section>

      <ConsultingBanner />

      <section className='mt-20'>
        <Container>
          <h2 className='text-3xl font-semibold'>{t('AboutSectionTitle')}</h2>
          <About />
          <Benefits />
        </Container>
      </section>

      <section className='mt-20'>
        <Container>
          <h2 className='text-3xl font-semibold'>{t('FaqSection')}</h2>
          <Faq />
        </Container>
      </section>
    </>
  );
}
