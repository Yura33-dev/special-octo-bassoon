'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useCartStore } from '@/providers/cart.provider';

export default function CartTotal() {
  const cart = useCartStore(state => state.cart);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    setTotalPrice(getTotalPrice());
  }, [getTotalPrice, cart]);

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
        <h5 className='text-xl text-center mt-3'>Кошик порожній</h5>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 mt-auto border-t-[1px] pt-4'>
      <p className='text-base text-center'>
        Всього:{' '}
        <span className='font-semibold'>
          {totalPrice.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}{' '}
        </span>{' '}
        грн
      </p>
      <Link
        href='/checkout'
        type='button'
        className='btn border-none min-h-0 h-auto px-2 py-4 text-foreground bg-accent md:hover:bg-primary md:hover:text-white uppercase'
      >
        оформити замовлення
      </Link>
    </div>
  );
}
