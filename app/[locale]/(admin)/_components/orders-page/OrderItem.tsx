'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { IOrderMapped } from '@/types';

import OrderData from './order-parts/OrderData';
import OrderFooter from './order-parts/OrderFooter';
import OrderHeader from './order-parts/OrderHeader';
import OrderProducts from './order-parts/OrderProducts';

interface IOrderItemProps {
  order: IOrderMapped;
}

const orderStatuses = {
  new: 'новий',
  processing: 'в обробці',
  delivery: 'доставляється',
  done: 'успішний',
  canceled: 'відміненний',
};

const deliveryType: Record<string, string> = {
  np: 'Нова пошта',
  ukr: 'Укр.пошта',
};

const paymentType: Record<string, string> = {
  bank: 'банківський переказ',
  afterpayment: 'післяплата',
};

export default function OrderItem({ order }: IOrderItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.li
      initial={{ height: 60 }}
      animate={isOpen ? { height: 'auto' } : { height: 60 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={clsx('relative bg-gray-300/50 rounded-md overflow-hidden')}
    >
      <OrderHeader
        orderNumber={order.orderNumber}
        orderStatus={orderStatuses[order.status]}
        orderDate={order.createdAt}
        isOpen={isOpen}
        onChange={() => setIsOpen(state => !state)}
      />

      <OrderData
        name={order.name}
        fatherName={order.fatherName}
        surname={order.surname}
        phone={order.phone}
        email={order.email}
        deliveryTo={order.deliveryTo}
        deliveryBy={order.deliveryBy}
        deliveryType={deliveryType[order.deliveryBy]}
        postNumber={order.postNumber}
        postCode={order.postCode}
        paymentType={paymentType[order.paymentType]}
      />

      <OrderProducts products={order.products} />

      <OrderFooter orderId={order.id} totalPrice={order.totalPrice} />
    </motion.li>
  );
}
