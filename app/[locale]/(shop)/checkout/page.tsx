import { getTranslations } from 'next-intl/server';

import Container from '@/components/shared/Container';

import CheckoutCart from '../_components/checkout-page/checkout-cart/CheckoutCart';
import CheckoutForm from '../_components/checkout-page/checkout-form/CheckoutForm';

export default async function CheckoutPage() {
  const t = await getTranslations('CheckoutPage');

  return (
    <section className='mt-12'>
      <Container>
        <h1 className='mb-4 text-2xl'>{t('CheckoutTitle')}</h1>

        <div className='flex flex-col gap-4 lg:flex-row lg:items-stretch'>
          <CheckoutCart className='lg:basis-[35%] lg:flex-grow-0' />
          <CheckoutForm className='lg:basis-[65%]' />
        </div>
      </Container>
    </section>
  );
}
