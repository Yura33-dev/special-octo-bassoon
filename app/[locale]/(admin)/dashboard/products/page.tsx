import { Suspense } from 'react';

import ProductsPage from '../../_components/products-page/ProductsPage';
import ProductsPageSkeleton from '../../_components/products-page/ProductsPageSkeleton';

interface IProductsPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    [key: string]: string | undefined;
  };
}

export const metadata = {
  title: 'ProGround | Продукти',
};

export default async function Page({ searchParams }: IProductsPageProps) {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsPage searchParams={searchParams} />
    </Suspense>
  );
}
