'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { useCartStore } from '@/providers/cart.provider';

import CartItem from '../../shared/cart/CartItem';

interface ICheckoutCartProps {
  className?: string;
}

export default function CheckoutCart({ className }: ICheckoutCartProps) {
  const t = useTranslations('Cart');

  const cart = useCartStore(state => state.cart);

  return (
    <div className={clsx(className && `${className}`)}>
      {cart.length <= 0 && <h2>{t('Empty')}</h2>}

      {cart.length > 0 && (
        <div className='bg-white rounded-md p-4'>
          <h2 className='text-xl mb-2'>{t('Title')}</h2>
          <ul className='max-h-[574px] overflow-x-auto flex flex-col gap-4 pr-2'>
            {cart.map((item, index) => (
              <CartItem key={index} product={item} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
