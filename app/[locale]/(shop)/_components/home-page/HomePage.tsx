import { IPage } from '@/types';

import AboutSection from './sections/AboutSection';
import FAQSection from './sections/FAQSection';
import FeaturedCategoriesSection from './sections/FeaturedCategoriesSection';
import HeroSection from './sections/HeroSection';
import NewProductsSection from './sections/NewProductsSection';
import ConsultingBanner from '../shared/consulting-banner/ConsultingBanner';

interface IHomePageProps {
  dataPage: IPage;
}

export default function HomePage({ dataPage }: IHomePageProps) {
  return (
    <>
      <h1 className='sr-only'>{dataPage.data.h1}</h1>

      <HeroSection />
      <FeaturedCategoriesSection />
      <NewProductsSection />

      <ConsultingBanner />

      <AboutSection />
      <FAQSection />
    </>
  );
}
