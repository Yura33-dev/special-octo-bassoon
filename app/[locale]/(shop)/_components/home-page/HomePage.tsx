import { getLocale } from 'next-intl/server';

import { IPageLeaned } from '@/types';

import AboutSection from './sections/AboutSection';
import FAQSection from './sections/FAQSection';
import FeaturedCategoriesSection from './sections/FeaturedCategoriesSection';
import HeroSection from './sections/HeroSection';
import NewProductsSection from './sections/NewProductsSection';
import ConsultingBanner from '../shared/consulting-banner/ConsultingBanner';

interface IHomePageProps {
  dataPage: IPageLeaned;
}

export default async function HomePage({ dataPage }: IHomePageProps) {
  const locale = await getLocale();
  return (
    <>
      <h1 className='sr-only'>{dataPage.translatedData[locale].h1}</h1>

      <HeroSection />
      <FeaturedCategoriesSection />
      <NewProductsSection />

      <ConsultingBanner />

      <AboutSection />
      <FAQSection />
    </>
  );
}
