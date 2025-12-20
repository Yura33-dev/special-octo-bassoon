import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { config } from '@/lib/config';
import { locale } from '@/types';

import CheckoutCart from '../_components/checkout-page/checkout-cart/CheckoutCart';
import CheckoutForm from '../_components/checkout-page/checkout-form/CheckoutForm';

interface ICheckoutPageProps {
  params: {
    locale: locale;
  };
}

export async function generateMetadata({
  params,
}: ICheckoutPageProps): Promise<Metadata> {
  const t = await getTranslations('CheckoutPage');

  const currentUrl = `${config.NEXT_PUBLIC_APP_URL}/${params.locale}/checkout`;

  return {
    title: t('CheckoutTitle'),
    metadataBase: new URL(config.NEXT_PUBLIC_APP_URL),
    alternates: {
      canonical: currentUrl,
      languages: {
        uk: `${config.NEXT_PUBLIC_APP_URL}/uk/checkout`,
        ru: `${config.NEXT_PUBLIC_APP_URL}/ru/checkout`,
        'x-default': `${config.NEXT_PUBLIC_APP_URL}/uk/checkout`,
      },
    },
  };
}

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
