import { getTranslations } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { getAllCategories } from '@/lib/api';

import GridFeaturedCategories from '../catalog-categories/GridFeaturedCategories';

export default async function FeaturedCategoriesSection() {
  const t = await getTranslations('MainPage');
  const featuredCategories = await getAllCategories({
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
