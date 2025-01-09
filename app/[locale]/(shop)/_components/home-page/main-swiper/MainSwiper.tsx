import { getAllSlides } from '@/lib/api/slides/getAllSlides';

import MainSwiperClient from './MainSwiperClient';

export default async function MainSwiper() {
  const slides = await getAllSlides();

  return <MainSwiperClient slides={slides} />;
}
