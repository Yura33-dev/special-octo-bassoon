'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useCartStore } from '@/providers/cart.provider';

export default function CartBtn() {
  const [items, setItems] = useState<number>(0);

  const openCart = useCartStore(state => state.cartOpen);
  const cart = useCartStore(state => state.cart);
  const getTotalItems = useCartStore(state => state.getTotalItems());

  const t = useTranslations('Cart');

  useEffect(() => {
    setItems(getTotalItems);
  }, [getTotalItems, cart]);

  return (
    <div className='dropdown dropdown-end [backface-visibility:hidden]'>
      <button
        className='btn border-none flex bg-primary-dark hover:bg-accent focus-visible:bg-accent'
        aria-label={t('OpenCart')}
        onClick={openCart}
      >
        <div className='indicator'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-[24px] w-[24px]'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
          {items > 0 && (
            <span className='badge badge-sm indicator-item bg-orange-500 border-none leading-none h-[20px] w-[20px]'>
              {items}
            </span>
          )}
        </div>
      </button>
    </div>
  );
}
