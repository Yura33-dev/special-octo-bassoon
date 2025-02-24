'use client';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';

export default function NoProductsYet() {
  const t = useTranslations('CheckoutPage');

  return (
    <div>
      <p>{t('NoProductsYet')}</p>
      <Link
        href='/'
        className='btn border-none bg-primary hover:bg-primary-dark text-white mt-4'
      >
        {t('GoToMain')}
      </Link>
    </div>
  );
}
