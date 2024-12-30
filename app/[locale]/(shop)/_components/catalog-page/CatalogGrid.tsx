'use client';

import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

import CircleLoader from '@/components/shared/loaders/CircleLoader';
import { useRouter } from '@/i18n/routing';
import { IPagination, IProduct } from '@/types';

import Card from './catalog-card/Card';
import Pagination from './Pagination';

interface ICatalogGridProps {
  products: Array<IProduct>;
  paginationData: IPagination;
}

export default function CatalogGrid({
  products,
  paginationData,
}: ICatalogGridProps) {
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
    <>
      {isPending ? (
        <div className='flex justify-center mt-10'>
          <CircleLoader />
        </div>
      ) : (
        <ul className='grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 xl:gap-6'>
          {products.map(product => (
            <Card key={product.id} product={product} />
          ))}
        </ul>
      )}

      {totalPages > 1 && (
        <Pagination
          paginationData={paginationData}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
}
