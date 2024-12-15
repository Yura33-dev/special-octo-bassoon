'use client';

import clsx from 'clsx';
import { X } from 'lucide-react';

import { useCartStore } from '@/providers/cart.provider';

import CartItem from './CartItem';
import CartTotal from './CartTotal';

export default function Cart() {
  const isCartOpen = useCartStore(state => state.isCartOpen);
  const closeCart = useCartStore(state => state.cartClose);
  const cart = useCartStore(state => state.cart);

  return (
    <div
      className={clsx(
        `absolute top-0 right-0 p-4 w-full h-screen bg-white shadow-sm text-foreground transition-all duration-200 opacity-0 pointer-events-none z-[3]
        flex flex-col justify-start sm:rounded-md sm:w-[400px] sm:top-16 sm:right-4`,
        isCartOpen && 'opacity-100 pointer-events-auto',
        cart.length > 0 ? 'sm:h-[650px]' : 'sm:h-[350px]'
      )}
    >
      <div className='flex justify-between items-center'>
        <h4 className='text-center text-lg'>Кошик</h4>
        <button
          type='button'
          className='block text-white bg-primary md:hover:bg-green-800 rounded-md p-2 sm:p-1 transition-colors ml-auto'
          onClick={closeCart}
        >
          <X className='w-5 h-5' />
        </button>
      </div>

      <ul className='mt-4 max-h-[75%] overflow-x-auto flex flex-col gap-6 py-2'>
        {cart.map(item => (
          <CartItem key={item.id} product={item} />
        ))}
      </ul>

      <CartTotal />
    </div>
  );
}
