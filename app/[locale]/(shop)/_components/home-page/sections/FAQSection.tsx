import { getTranslations } from 'next-intl/server';

import Container from '@/components/shared/Container';

import Faq from '../faq/Faq';

export default async function FAQSection() {
  const t = await getTranslations('MainPage');
  return (
    <section className='mt-20'>
      <Container>
        <h2 className='text-3xl font-semibold'>{t('FaqSection')}</h2>
        <Faq />
      </Container>
    </section>
  );
}
