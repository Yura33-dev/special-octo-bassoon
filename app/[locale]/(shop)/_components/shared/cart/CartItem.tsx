'use client';

import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import {
  formattedPackValue,
  formattedPrice,
  getProductLinks,
} from '@/lib/utils';
import { IProductInCart, useCartStore } from '@/providers/cart.provider';

import CartCounter from './CartCounter';

interface ICartItemProps {
  product: IProductInCart;
}

export default function CartItem({ product }: ICartItemProps) {
  const t = useTranslations('Cart');
  const { productLink } = getProductLinks(product);

  const { data, imgUrl, packVariant } = product;
  const { name } = data;

  const removeProductFromCart = useCartStore(state => state.removeProduct);

  const handleRemoveProduct = () => {
    removeProductFromCart(packVariant.id);
    toast.info(
      t('FromCart', {
        title: `${name} (${formattedPackValue(packVariant.type, packVariant.measureValue, packVariant.measureIn)})`,
      })
    );
  };

  return (
    <li className='rounded-md p-2 shadow-sm border-[1px]'>
      <div className='flex items-start justify-start'>
        <Link href={productLink} className='block w-28 h-28 mr-2 flex-shrink-0'>
          <Image
            src={imgUrl}
            alt={name}
            width={150}
            height={150}
            className='w-full h-full object-cover rounded-md'
          />
        </Link>

        <div className='flex flex-col gap-2 basis-full'>
          <div className='flex flex-col gap-2 sm:flex-row-reverse sm:justify-between sm:items-center sm:gap-0'>
            <button
              type='button'
              aria-label={t('DeleteItem', { title: name })}
              onClick={handleRemoveProduct}
              className='self-end'
            >
              <Trash2 className='w-[18px] h-[18px] stroke-red-500' />
            </button>

            <Link href={productLink}>
              <h5 className='text-sm leading-none sm:max-w-[190px] sm:truncate'>
                {name}
              </h5>
            </Link>
          </div>

          <CartCounter
            quantity={packVariant.orderedQuantity}
            packId={packVariant.id}
          />

          <p className='mt-1 text-sm'>
            {t('Price')} <span>{formattedPrice(packVariant.price)}</span>
          </p>

          <div className='badge text-xs border-none bg-accent text-foreground'>
            {formattedPackValue(
              packVariant.type,
              packVariant.measureValue,
              packVariant.measureIn
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
