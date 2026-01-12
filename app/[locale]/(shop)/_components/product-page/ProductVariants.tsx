'use client';

import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { UsePackPrice } from '@/lib/hooks';
import { formattedPackValue, formattedPrice } from '@/lib/utils';
import { useCartStore } from '@/providers/cart.provider';
import {
  IProductInCart,
  IProductMapped,
  IProductPackItemMapped,
} from '@/types';

import CardLabelDiscount from '../shared/catalogGrid/product-card/CardLabelDiscount';

interface IPackagingProps {
  product: IProductMapped;
}

export default function ProductVariants({ product }: IPackagingProps) {
  const locale = useLocale();
  const t = useTranslations('Cart');
  const t2 = useTranslations('ProductPage');

  const addProductToCart = useCartStore(state => state.addProduct);

  const [selectedPack, setSelectedPack] = useState<IProductPackItemMapped>(
    product.packaging.items.find(
      pack => pack.packId.id === product.packaging.default.id
    ) ?? product.packaging.items[0]
  );

  const handleChangeActivePackaging = (pack: IProductPackItemMapped) => {
    setSelectedPack(pack);
  };

  const handleAddToCart = () => {
    const productObject: IProductInCart = {
      id: product.id,
      producer: product.producer,
      imgUrl: product.imgUrl,
      translatedData: product.translatedData,
      categories: product.categories,
      packVariant: { ...selectedPack, orderedQuantity: 1 },
    };

    addProductToCart(productObject);
    toast.success(
      t('ToCart', {
        title: `${productObject.translatedData[locale].name} (${formattedPackValue(productObject.packVariant.packId.translatedData[locale].type, productObject.packVariant.packId.translatedData[locale].measureValue, productObject.packVariant.packId.translatedData[locale].measureIn)})`,
      })
    );
  };

  const sortedPackaging = useMemo(() => {
    return [...product.packaging.items].sort((a, b) => {
      const getSortPriority = (item: IProductPackItemMapped) => {
        if (item.inStock) {
          return 0;
        }
        if (item.madeToOrder && !item.inStock) {
          return 1;
        }
        return 2;
      };

      const priorityA = getSortPriority(a);
      const priorityB = getSortPriority(b);

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      return (
        a.packId.translatedData[locale].measureValue -
        b.packId.translatedData[locale].measureValue
      );
    });
  }, [product.packaging.items, locale]);

  const { price, oldPrice, isDiscountExist } = UsePackPrice({
    exchange: product.producer.exchangeRate,
    price: selectedPack.price,
    oldPrice: selectedPack.oldPrice,
  });

  return (
    <>
      <h2 className='text-base mb-3'>{t2('ProductPackaging')}</h2>
      <ul className='mb-5 grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] gap-4 md:mb-10'>
        {sortedPackaging.map(pack => (
          <li key={pack.packId.id} className='flex flex-col items-center gap-1'>
            <button
              onClick={() => handleChangeActivePackaging(pack)}
              className={clsx(
                'text-sm p-1 rounded-md text-center border-[2px] bg-teal-600/5 transition-colors relative',
                selectedPack.packId.id === pack.packId.id
                  ? 'border-accent'
                  : 'border-gray-300',
                !pack.inStock &&
                  'border-gray-200 text-gray-400 hover:cursor-not-allowed'
              )}
              disabled={!pack.inStock}
            >
              {formattedPackValue(
                pack.packId.translatedData[locale].type,
                pack.packId.translatedData[locale].measureValue,
                pack.packId.translatedData[locale].measureIn
              )}
            </button>
            {!pack.inStock && !pack.madeToOrder && (
              <span className='text-sm text-gray-600'>{t2('OutStock')}</span>
            )}
            {!pack.inStock && pack.madeToOrder && (
              <span className='text-sm text-yellow-700'>
                {t2('MadeToOrder')}
              </span>
            )}
            {pack.inStock && pack.oldPrice > 0 && (
              <div className='bg-red-700 px-2.5 py-1 rounded-md text-xs text-white uppercase'>
                {t2('Discount')}
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className='mb-5 md:mb-10'>
        <h2 className='text-2xl md:text-3xl font-medium flex flex-col gap-1'>
          {formattedPrice(price)}
          {selectedPack.packId.showPricePerUnit && (
            <span className='text-base md:text-sm font-normal'>
              {(product.producer.exchangeRate
                ? (selectedPack.price * product.producer.exchangeRate) /
                  100 /
                  selectedPack.packId.translatedData[locale].measureValue
                : selectedPack.price /
                  100 /
                  selectedPack.packId.translatedData[locale].measureValue
              ).toFixed(2)}{' '}
              грн/
              {selectedPack.packId.translatedData[locale].measureIn}
            </span>
          )}
        </h2>

        <h2 className='text-gray-400/80 line-through text-2xl'>
          {oldPrice && <span>{formattedPrice(oldPrice)}</span>}
        </h2>
        {isDiscountExist && oldPrice && (
          <CardLabelDiscount oldPrice={oldPrice} price={price} />
        )}
      </div>

      <button
        className='btn w-full lg:max-w-[150px] border-none bg-accent uppercase text-base hover:bg-primary hover:text-white'
        onClick={handleAddToCart}
      >
        {t('buttonToCart')}
      </button>
    </>
  );
}
