import { IOrderMapped } from '@/types';

import OrderItem from './OrderItem';

interface IOrdersListProps {
  orders: Array<IOrderMapped>;
}

export default async function OrdersList({ orders }: IOrdersListProps) {
  if (orders.length < 1) {
    return <h2 className='mt-10 text-xl'>Список замовлень порожній</h2>;
  }

  return (
    <ul className='flex flex-col gap-2'>
      {orders.map(order => (
        <OrderItem key={order.id} order={order} />
      ))}
    </ul>
  );
}
