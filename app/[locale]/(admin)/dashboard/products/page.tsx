import { Suspense } from 'react';

import ProductsPage from '../../_components/products-page/ProductsPage';

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
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPage searchParams={searchParams} />
    </Suspense>
  );
}
