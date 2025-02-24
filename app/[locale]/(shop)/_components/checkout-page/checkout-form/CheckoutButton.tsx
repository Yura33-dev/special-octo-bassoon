'use client';

import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';

import CircleLoader from '@/components/shared/loaders/CircleLoader';

export default function CheckoutButton() {
  const { pending } = useFormStatus();
  const t = useTranslations('Cart');

  return (
    <button
      type='submit'
      className='min-w-[185px] btn bg-accent border-none hover:bg-primary hover:text-white mt-4'
      disabled={pending}
    >
      {pending ? <CircleLoader className='border-white' /> : t('Order')}
    </button>
  );
}
