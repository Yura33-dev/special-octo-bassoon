import { getTranslations } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { getLatestProducts } from '@/lib/api';

import NewProductsSwiperClient from '../new-products-swiper/NewProductSwiperClient';

export default async function NewProductsSection() {
  const [t, latestProducts] = await Promise.all([
    getTranslations('MainPage'),
    getLatestProducts(),
  ]);

  return (
    <>
      {latestProducts.length > 5 && (
        <section className='mt-20'>
          <Container className='relative'>
            <h2 className='text-3xl font-semibold mb-8'>
              {t('NewProductsSectionTitle')}
            </h2>

            <NewProductsSwiperClient products={latestProducts} />
          </Container>
        </section>
      )}
    </>
  );
}
