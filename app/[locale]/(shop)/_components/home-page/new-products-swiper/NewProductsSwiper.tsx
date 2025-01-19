import { getLocale } from 'next-intl/server';

import { getLatestProducts } from '@/lib/api';
import { locale } from '@/types';

import NewProductsSwiperClient from './NewProductSwiperClient';

export default async function NewProductsSwiper() {
  const locale = (await getLocale()) as locale;

  const { products: latestProducts } = await getLatestProducts(locale);

  return <NewProductsSwiperClient products={latestProducts} />;
}
