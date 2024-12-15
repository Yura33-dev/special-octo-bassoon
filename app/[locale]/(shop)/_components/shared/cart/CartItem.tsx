'use client';

import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

import { IProduct, useCartStore } from '@/providers/cart.provider';

import CartCounter from './CartCounter';

interface ICartItemProps {
  product: IProduct;
}

export default function CartItem({ product }: ICartItemProps) {
  const { id, title, price, quantity, imgUrl, pack } = product;

  const removeProductFromCart = useCartStore(state => state.removeProduct);

  const handleRemoveProduct = () => {
    removeProductFromCart(id);
    toast.info(`Товар ${title} видалений з кошика`);
  };

  return (
    <li className='rounded-md p-2 shadow-sm border-[1px]'>
      <div className='flex items-start justify-start'>
        <Link href='#' className='block w-28 h-28 mr-2 flex-shrink-0'>
          <Image
            src={imgUrl}
            alt={title}
            width={150}
            height={150}
            className='w-full h-full object-cover rounded-md'
          />
        </Link>

        <div className='flex flex-col gap-2 basis-full'>
          <div className='flex flex-col gap-2 sm:flex-row-reverse sm:justify-between sm:items-center sm:gap-0'>
            <button
              type='button'
              aria-label={`Видалити ${title} з корзини`}
              onClick={handleRemoveProduct}
              className='self-end'
            >
              <Trash2 className='w-[18px] h-[18px] stroke-red-500' />
            </button>

            <Link href='#'>
              <h5 className='text-sm leading-none sm:max-w-[190px] sm:truncate'>
                {title}
              </h5>
            </Link>
          </div>

          <CartCounter quantity={quantity} productId={id} />

          <p className='mt-1 text-sm'>
            Ціна:{' '}
            <span>
              {price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} грн
            </span>
          </p>

          <div className='badge text-xs border-none bg-accent text-foreground'>
            {pack}
          </div>
        </div>
      </div>
    </li>
  );
}
