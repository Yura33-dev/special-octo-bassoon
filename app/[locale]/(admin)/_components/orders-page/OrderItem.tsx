'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { usePathname } from '@/i18n/routing';
import { IOrderMapped } from '@/types';

import DeleteOrderModal from './modals/DeleteOrderModal';
import UnarchiveOrderModal from './modals/UnarchiveOrderModal';
import OrderData from './order-parts/OrderData';
import OrderFooter from './order-parts/OrderFooter';
import OrderHeader from './order-parts/OrderHeader';
import OrderProducts from './order-parts/OrderProducts';
import { deliveryType, orderStatuses, paymentType } from './orderData';

interface IOrderItemProps {
  order: IOrderMapped;
}

export default function OrderItem({ order }: IOrderItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelectedOrderToDelete, setIsSelectedOrderToDelete] =
    useState<boolean>(false);
  const [isSelectedOrderToUnarchive, setIsSelectedOrderToUnarchive] =
    useState<boolean>(false);

  const pathName = usePathname();

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

      <OrderProducts
        products={order.products}
        className='mt-8 px-4'
        titleClassName='font-semibold'
      />

      <OrderFooter
        orderId={order.id}
        totalPrice={order.totalPrice}
        setIsSelectedOrderToDelete={setIsSelectedOrderToDelete}
        setIsSelectedOrderToUnarchive={setIsSelectedOrderToUnarchive}
      />

      {pathName.includes('archive') && (
        <DeleteOrderModal
          order={order}
          setIsSelectedOrderToDelete={setIsSelectedOrderToDelete}
          isSelectedToDelete={isSelectedOrderToDelete}
        />
      )}

      {pathName.includes('archive') && (
        <UnarchiveOrderModal
          order={order}
          setIsSelectedOrderToUnarchive={setIsSelectedOrderToUnarchive}
          isSelectedOrderToUnarchive={isSelectedOrderToUnarchive}
        />
      )}
    </motion.li>
  );
}
