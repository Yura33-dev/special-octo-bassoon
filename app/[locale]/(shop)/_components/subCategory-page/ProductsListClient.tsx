'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react';

import CircleLoader from '@/components/shared/loaders/CircleLoader';
import Pagination from '@/components/shared/Pagination';
import { useRouter } from '@/i18n/routing';
import { IPagination, IProduct } from '@/types';

import Card from '../catalog-page/catalog-card/Card';

interface ICatalogGridProps {
  products: Array<IProduct>;
  paginationData: IPagination;
}

export default function ProductsListClient({
  products,
  paginationData,
}: ICatalogGridProps) {
  const t = useTranslations('CatalogPage');

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
    <div>
      {products.length <= 0 && (
        <h2 className='text-lg text-center mt-6'>{t('NoProducts')}</h2>
      )}
      {isPending ? (
        <div className='flex justify-center mt-10'>
          <CircleLoader />
        </div>
      ) : (
        <ul className='grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 '>
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
    </div>
  );
}
