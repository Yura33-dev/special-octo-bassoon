'use client';

import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { formattedPrice, getProductLinks } from '@/lib/utils';
import { IProductInCart, useCartStore } from '@/providers/cart.provider';

import CartCounter from './CartCounter';

interface ICartItemProps {
  product: IProductInCart;
}

export default function CartItem({ product }: ICartItemProps) {
  const t = useTranslations('ProductCard');
  const { productLink } = getProductLinks(product);

  const { data, imgUrl, packVariant } = product;
  const { name } = data;

  const removeProductFromCart = useCartStore(state => state.removeProduct);

  const packagingString = `${packVariant.data.type} ${packVariant.data.measureValue} ${packVariant.data.measureIn}`;

  const handleRemoveProduct = () => {
    removeProductFromCart(packVariant.id);
    toast.info(
      t('cart.FromCart', {
        title: `${name} (${packVariant.data.type} ${packVariant.data.measureValue} ${packVariant.data.measureIn})`,
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
              aria-label={t('cart.DeleteItem', { title: name })}
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
            {t('cart.Price')} <span>{formattedPrice(packVariant.price)}</span>
          </p>

          <div className='badge text-xs border-none bg-accent text-foreground'>
            {packagingString}
          </div>
        </div>
      </div>
    </li>
  );
}
