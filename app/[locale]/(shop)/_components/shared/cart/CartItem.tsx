'use client';

import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Link } from '@/i18n/routing';
import {
  formattedPackValue,
  formattedPrice,
  getProductLinks,
} from '@/lib/utils';
import { useCartStore } from '@/providers/cart.provider';
import { IProductInCart, locale } from '@/types';

import CartCounter from './CartCounter';

interface ICartItemProps {
  product: IProductInCart;
}

export default function CartItem({ product }: ICartItemProps) {
  const t = useTranslations('Cart');
  const locale = useLocale() as locale;

  const { productLink } = getProductLinks(product, locale);

  const { translatedData, imgUrl, packVariant } = product;
  const { name } = translatedData[locale];
  const { packId } = packVariant;

  const removeProductFromCart = useCartStore(state => state.removeProduct);

  const handleRemoveProduct = () => {
    removeProductFromCart(packId.id);
    toast.info(
      t('FromCart', {
        title: `${name} (${formattedPackValue(packId.translatedData[locale].type, packId.translatedData[locale].measureValue, packId.translatedData[locale].measureIn)})`,
      })
    );
  };

  return (
    <li className='rounded-md p-2 shadow-sm border-[1px]'>
      <div className='flex flex-col items-center justify-start sm:items-start sm:flex-row'>
        <Link
          href={productLink}
          className='block w-full h-28 flex-shrink-0 sm:mr-2 sm:w-28'
        >
          <Image
            src={imgUrl}
            alt={name}
            width={600}
            height={300}
            className='w-full h-full object-cover rounded-md'
          />
        </Link>

        <div className='w-full flex flex-col gap-2 items-center sm:items-start basis-full'>
          <div className='w-full flex flex-col-reverse items-center justify-around my-2 gap-2 sm:flex-row sm:my-0 sm:items-center sm:gap-0'>
            <Link
              href={productLink}
              className='basis-full text-center sm:text-start'
            >
              <h5 className='text-md sm:text-sm leading-none sm:max-w-[190px] sm:truncate'>
                {name}
              </h5>
            </Link>

            <button
              type='button'
              aria-label={t('DeleteItem', { title: name })}
              onClick={handleRemoveProduct}
              className='basis-auto self-end'
            >
              <Trash2 className='w-[22px] h-[22px] sm:w-[18px] sm:h-[18px] stroke-red-500' />
            </button>
          </div>

          <CartCounter
            quantity={packVariant.orderedQuantity}
            packId={packId.id}
          />

          <p className='my-2 sm:my-1 text-sm'>
            {t('Price')} <span>{formattedPrice(packVariant.price)}</span>
          </p>

          <div className='badge text-xs border-none bg-accent text-foreground'>
            {formattedPackValue(
              packId.translatedData[locale].type,
              packId.translatedData[locale].measureValue,
              packId.translatedData[locale].measureIn
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
