'use client';

import clsx from 'clsx';

import { formattedDiscount } from '@/lib/utils';

interface ICardLabelDiscountProps {
  oldPrice: number;
  price: number;
  className?: string;
}

export default function CardLabelDiscount({
  oldPrice,
  price,
  className,
}: ICardLabelDiscountProps) {
  return (
    <span
      className={clsx(
        'block bg-red-600 text-white text-xs rounded-md w-max px-1.5 py-0.5',
        className && className
      )}
    >
      -{formattedDiscount(oldPrice, price)}
    </span>
  );
}
