'use client';

import { formattedDiscount } from '@/lib/utils';

interface ICardLabelDiscountProps {
  oldPrice: number;
  price: number;
}

export default function CardLabelDiscount({
  oldPrice,
  price,
}: ICardLabelDiscountProps) {
  return (
    <span className='block bg-red-600 text-white text-xs rounded-md w-max px-1.5 py-0.5'>
      -{formattedDiscount(oldPrice, price)}
    </span>
  );
}
