'use client';

import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

import CircleLoader from '@/components/shared/loaders/CircleLoader';
import Pagination from '@/components/shared/Pagination';
import { useRouter } from '@/i18n/routing';
import { IPagination, IProductMapped } from '@/types';

import ProductItem from './ProductItem';

interface IProductListProps {
  products: Array<IProductMapped>;
  paginationData: IPagination;
}

export default function ProductList({
  products,
  paginationData,
}: IProductListProps) {
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
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {products.map(product => (
            <ProductItem key={product.id} product={product} />
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
