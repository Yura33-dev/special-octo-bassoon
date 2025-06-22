'use client';

import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { formattedPackValue, formattedPrice } from '@/lib/utils';
import { useCartStore } from '@/providers/cart.provider';
import {
  IProductInCart,
  IProductMapped,
  IProductPackItemMapped,
} from '@/types';

interface IPackagingProps {
  product: IProductMapped;
}

export default function ProductVariants({ product }: IPackagingProps) {
  const locale = useLocale();
  const t = useTranslations('Cart');
  const t2 = useTranslations('ProductPage');

  const addProductToCart = useCartStore(state => state.addProduct);

  const [activePack, setActivePack] = useState<IProductPackItemMapped>(
    product.packaging.items[0]
  );

  const toggleActivePack = (pack: IProductPackItemMapped) => {
    setActivePack(pack);
  };

  const handleAddToCart = () => {
    const productObject: IProductInCart = {
      id: product.id,
      producer: product.producer,
      imgUrl: product.imgUrl,
      translatedData: product.translatedData,
      categories: product.categories,
      packVariant: { ...activePack, orderedQuantity: 1 },
    };

    addProductToCart(productObject);
    toast.success(
      t('ToCart', {
        title: `${productObject.translatedData[locale].name} (${formattedPackValue(productObject.packVariant.packId.translatedData[locale].type, productObject.packVariant.packId.translatedData[locale].measureValue, productObject.packVariant.packId.translatedData[locale].measureIn)})`,
      })
    );
  };

  const sortedPackaging = product.packaging.items.toSorted(
    (first, second) =>
      first.packId.translatedData[locale].measureValue -
      second.packId.translatedData[locale].measureValue
  );

  return (
    <>
      <h2 className='text-base mb-3'>{t2('ProductPackaging')}</h2>
      <ul className='mb-5 grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] gap-4 md:mb-10'>
        {sortedPackaging.map(pack => (
          <li key={pack.packId.id}>
            <button
              onClick={() => toggleActivePack(pack)}
              className={clsx(
                'text-sm p-1 rounded-md text-center border-[2px] bg-teal-600/5 transition-colors',
                activePack.packId.id === pack.packId.id
                  ? 'border-accent'
                  : 'border-gray-300',
                pack.quantity <= 0 &&
                  !!pack.quantity &&
                  'border-gray-200 text-gray-400'
              )}
              disabled={!!pack.quantity && pack.quantity <= 0}
            >
              {formattedPackValue(
                pack.packId.translatedData[locale].type,
                pack.packId.translatedData[locale].measureValue,
                pack.packId.translatedData[locale].measureIn
              )}
            </button>
          </li>
        ))}
      </ul>

      <h2 className='text-2xl md:text-3xl font-medium flex flex-col gap-1 mb-5 md:mb-10'>
        {formattedPrice(
          product.producer.exchangeRate
            ? activePack.price * product.producer.exchangeRate
            : activePack.price
        )}
        {activePack.packId.showPricePerUnit && (
          <span className='text-base md:text-sm font-normal'>
            {(product.producer.exchangeRate
              ? (activePack.price * product.producer.exchangeRate) /
                100 /
                activePack.packId.translatedData[locale].measureValue
              : activePack.price /
                100 /
                activePack.packId.translatedData[locale].measureValue
            ).toFixed(2)}{' '}
            грн/
            {activePack.packId.translatedData[locale].measureIn}
          </span>
        )}
      </h2>

      <button
        className='btn w-full lg:max-w-[150px] border-none bg-accent uppercase text-base hover:bg-primary hover:text-white'
        onClick={handleAddToCart}
      >
        {t('buttonToCart')}
      </button>
    </>
  );
}
