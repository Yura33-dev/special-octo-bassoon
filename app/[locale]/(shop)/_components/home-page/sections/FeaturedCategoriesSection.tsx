import { getLocale, getTranslations } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { getAllCategories } from '@/lib/api';
import { locale } from '@/types';

import GridFeaturedCategories from '../catalog-categories/GridFeaturedCategories';

export default async function FeaturedCategoriesSection() {
  const locale = (await getLocale()) as locale;

  const t = await getTranslations('MainPage');
  const featuredCategories = await getAllCategories(locale, {
    visible: true,
    featured: true,
  });

  return (
    <section className='mt-20'>
      <Container>
        <h2 className='sr-only'>{t('CategoriesSectionTitle')}</h2>
        <GridFeaturedCategories featuredCategories={featuredCategories} />
      </Container>
    </section>
  );
}
