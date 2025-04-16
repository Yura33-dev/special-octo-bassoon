import { getTranslations } from 'next-intl/server';

import Container from '@/components/shared/Container';

import About from '../about-us/About';
import Benefits from '../about-us/Benefits';

export default async function AboutSection() {
  const t = await getTranslations('MainPage');

  return (
    <section className='mt-20'>
      <Container>
        <h2 className='text-3xl font-semibold'>{t('AboutSectionTitle')}</h2>
        <About />
        <Benefits />
      </Container>
    </section>
  );
}
