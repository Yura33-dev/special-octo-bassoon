'use client';

import { useMemo } from 'react';

interface IUsePackPriceProps {
  exchange: number | null;
  price: number;
  oldPrice: number;
}

export function UsePackPrice({
  exchange,
  price,
  oldPrice,
}: IUsePackPriceProps) {
  return useMemo(() => {
    const exchangeRate = exchange ?? 1;

    const calculatedPrice = price * exchangeRate;
    const calculatedOldPrice = oldPrice ? oldPrice * exchangeRate : null;

    return {
      price: calculatedPrice,
      oldPrice: calculatedOldPrice,
      isDiscountExist: !!calculatedOldPrice,
    };
  }, [exchange, price, oldPrice]);
}
