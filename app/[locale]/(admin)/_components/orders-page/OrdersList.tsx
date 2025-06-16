'use client';

import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

import CircleLoader from '@/components/shared/loaders/CircleLoader';
import Pagination from '@/components/shared/Pagination';
import { useRouter } from '@/i18n/routing';
import { IOrderMapped, IPagination } from '@/types';

import OrderItem from './OrderItem';

interface IOrdersListProps {
  orders: Array<IOrderMapped>;
  paginationData: IPagination;
}

export default function OrdersList({
  orders,
  paginationData,
}: IOrdersListProps) {
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const router = useRouter();

  const { totalPages } = paginationData;

  const handlePageChange = (page: number) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set('page', page.toString());
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className='flex flex-col basis-full'>
      {isPending ? (
        <div className='flex justify-center mt-10'>
          <CircleLoader />
        </div>
      ) : (
        <ul className='flex flex-col gap-2 mt-10'>
          {orders.map(order => (
            <OrderItem key={order.id} order={order} />
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <Pagination
          paginationData={paginationData}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}
