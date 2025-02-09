import { IPagination, IProduct } from '@/types';

import ProductsListClient from './ProductsListClient';

interface IProductsListProps {
  products: Array<IProduct>;
  paginationData: IPagination;
}

export default async function ProductsList({
  products,
  paginationData,
}: IProductsListProps) {
  return (
    <ProductsListClient products={products} paginationData={paginationData} />
  );
}
