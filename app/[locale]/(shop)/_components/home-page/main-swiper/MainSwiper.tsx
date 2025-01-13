import { getLocale } from 'next-intl/server';

import { getAllSlides } from '@/lib/api/slides/getAllSlides';
import { locale } from '@/types';

import MainSwiperClient from './MainSwiperClient';

export default async function MainSwiper() {
  const locale = (await getLocale()) as locale;
  const slides = await getAllSlides(locale);

  return <MainSwiperClient slides={slides} />;
}
