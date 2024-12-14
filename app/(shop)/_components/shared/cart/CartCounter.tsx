'use client';

import { Minus, Plus } from 'lucide-react';

import { useCartStore } from '@/providers/cart.provider';

interface ICartCounterProps {
  quantity: number;
  productId: string;
}

export default function CartCounter({
  quantity,
  productId,
}: ICartCounterProps) {
  const increaseQuantity = useCartStore(state => state.increaseProductQuantity);
  const decreaseQuantity = useCartStore(state => state.decreaseProductQuantity);

  const handleIncreaseProductQuantity = () => {
    increaseQuantity(productId);
  };

  const handleDecreaseProductQuantity = () => {
    decreaseQuantity(productId);
  };

  return (
    <div className='flex justify-start items-center w-full'>
      <button
        type='button'
        className='btn bg-primary min-h-0 h-auto p-1 text-white rounded-sm border-none md:hover:bg-green-800 disabled:bg-slate-300'
        disabled={quantity === 1}
        onClick={handleDecreaseProductQuantity}
      >
        <Minus className='w-4 h-4' />
      </button>

      <div className='px-2 w-10 h-7 text-center bg-white flex justify-center items-center'>
        {quantity}
      </div>

      <button
        type='button'
        className='btn bg-primary min-h-0 h-auto p-1 text-white rounded-sm border-none md:hover:bg-green-800 disabled:bg-slate-300'
        onClick={handleIncreaseProductQuantity}
      >
        <Plus className='w-4 h-4' />
      </button>
    </div>
  );
}