'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import Skeleton from '@/components/shared/loaders/Skeleton';
import { useRouter } from '@/i18n/routing';
import { formattedPrice } from '@/lib/utils';
import { useCartStore } from '@/providers/cart.provider';

export default function CartTotal() {
  const router = useRouter();

  const isCartLoading = useCartStore(state => state.isCartLoading);
  const cart = useCartStore(state => state.cart);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  const closeCart = useCartStore(state => state.cartClose);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const t = useTranslations('Cart');

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [getTotalPrice, cart]);

  const handleCheckoutClick = () => {
    router.push('/checkout');
    closeCart();
  };

  if (cart.length === 0) {
    return (
      <div>
        <div className='w-full max-w-[420px] h-[200px] mx-auto overflow-hidden'>
          <Image
            src='/empty-cart.png'
            alt='empty cart'
            width={400}
            height={300}
            className='w-full h-full object-cover'
          />
        </div>
        <h5 className='text-xl text-center mt-3'>{t('Empty')}</h5>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 mt-auto border-t-[1px] pt-4'>
      {isCartLoading && <Skeleton quantity={1} className='w-3/4 h-6 mx-auto' />}
      {!isCartLoading && (
        <p className='text-base text-center flex gap-2 justify-center'>
          {t('Total')}
          <span className='font-semibold'>{formattedPrice(totalPrice)}</span>
        </p>
      )}

      <button
        disabled={isCartLoading}
        onClick={handleCheckoutClick}
        type='button'
        className='btn border-none min-h-0 h-auto px-2 py-4 text-foreground bg-accent md:hover:bg-primary md:hover:text-white uppercase
                  disabled:bg-slate-200'
      >
        {t('Order')}
      </button>
    </div>
  );
}
