import { CheckCircle } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { Link } from '@/i18n/routing';
import { locale } from '@/types';

import ClearCartOnSuccess from '../../_components/checkout-page/success-page/ClearCartOnSuccess';

interface ICheckoutPageProps {
  params: {
    locale: locale;
  };
  searchParams: {
    order?: string;
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('CheckoutPage');

  return {
    title: t('SuccessTitle'),
  };
}

export default async function CheckoutPageSuccess({
  searchParams,
}: ICheckoutPageProps) {
  const t = await getTranslations('CheckoutPage');
  const orderNumber = searchParams.order || undefined;

  return (
    <section className='mt-12 mb-20'>
      <Container>
        <div className='flex flex-col items-center text-center gap-6'>
          <div className='bg-teal-700/20 w-24 h-24 rounded-full flex justify-center items-center'>
            <CheckCircle className='w-16 h-16 stroke-primary text-primary' />
          </div>

          <h1 className='text-2xl font-medium text-center md:text-4xl md:mb-4'>
            {t('SuccessHeader')}
          </h1>

          <div className='flex flex-col gap-4'>
            <p className='text-base text-center max-w-md'>
              {t('SuccessDescription')}
            </p>

            {orderNumber && (
              <div className='bg-white p-4 rounded-md shadow-md'>
                <p className='text-base'>
                  {t('SuccessOrderNumber', { order: orderNumber })}
                </p>
              </div>
            )}
          </div>
        </div>

        <Link
          href='/'
          className='block min-w-[185px] w-max px-2 py-2 rounded-md bg-primary border-none text-center
                      hover:bg-primary-dark hover:text-white text-white transition-colors
                      mx-auto mt-8'
        >
          {t('GoToMain')}
        </Link>
      </Container>

      <ClearCartOnSuccess order={orderNumber} />
    </section>
  );
}
