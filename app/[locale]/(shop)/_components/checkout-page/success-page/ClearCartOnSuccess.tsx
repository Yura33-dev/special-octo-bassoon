'use client';

import { useEffect } from 'react';

import { useCartStore } from '@/providers';

export default function ClearCartOnSuccess({ order }: { order?: string }) {
  const cleanCart = useCartStore(state => state.cleanCart);
  const total = useCartStore(state => state.getTotalPrice());

  useEffect(() => {
    if (!order) return;

    const key = `order-cleared-${order}`;

    if (sessionStorage.getItem(key)) return;

    if (window.dataLayer && total) {
      window.dataLayer.push({
        event: 'successful_order',
        orderId: order,
        total: total / 100,
      });
    }

    cleanCart();
    sessionStorage.setItem(key, '1');
  }, [order, cleanCart, total]);

  return null;
}
