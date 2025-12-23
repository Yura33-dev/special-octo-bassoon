'use client';

import { useEffect } from 'react';

import { useCartStore } from '@/providers';

export default function ClearCartOnSuccess({ order }: { order?: string }) {
  const cleanCart = useCartStore(state => state.cleanCart);

  useEffect(() => {
    if (!order) return;
    const key = `order-cleared-${order}`;
    if (sessionStorage.getItem(key)) return;
    cleanCart();
    sessionStorage.setItem(key, '1');
  }, [order, cleanCart]);

  return null;
}
