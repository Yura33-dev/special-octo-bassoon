'use client';

import { useEffect } from 'react';

import { UsePackPrice } from '@/lib/hooks';
import { formattedPrice } from '@/lib/utils';
import { IProducerMapped, IProductPackItemMapped } from '@/types';

import CardLabelDiscount from './CardLabelDiscount';

interface ICardPriceProps {
  producer: IProducerMapped;
  selectedPack: IProductPackItemMapped;
  setDiscountLabel: (value: boolean) => void;
}

export default function CardPrice({
  producer,
  selectedPack,
  setDiscountLabel,
}: ICardPriceProps) {
  const { price, oldPrice, isDiscountExist } = UsePackPrice({
    exchange: producer.exchangeRate,
    price: selectedPack.price,
    oldPrice: selectedPack.oldPrice,
  });

  useEffect(() => {
    if (isDiscountExist) {
      setDiscountLabel(true);
    } else {
      setDiscountLabel(false);
    }
  }, [isDiscountExist, setDiscountLabel]);

  return (
    <div className='text-center mb-2'>
      <span className='new-price block font-bold text-xl'>
        {formattedPrice(price)}
      </span>

      <p className='flex gap-2 justify-center items-center min-h-[24px]'>
        {isDiscountExist && oldPrice && (
          <>
            <span className='old-price block w-max line-through text-gray-400 relative'>
              {formattedPrice(oldPrice)}
            </span>

            <CardLabelDiscount oldPrice={oldPrice} price={price} />
          </>
        )}
      </p>
    </div>
  );
}
