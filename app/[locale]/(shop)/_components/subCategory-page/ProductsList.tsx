import { getLocale } from 'next-intl/server';

import { getAllProductsByCategoryId } from '@/lib/api';
import { locale } from '@/types';

import ProductsListClient from './ProductsListClient';

interface IProductsListProps {
  page: number;
  limit: number;
  categoryId: string;
}

export default async function ProductsList({
  page,
  limit,
  categoryId,
}: IProductsListProps) {
  const locale = (await getLocale()) as locale;

  const { products, paginationData } = await getAllProductsByCategoryId(
    locale,
    categoryId,
    page,
    limit
  );

  return (
    <ProductsListClient products={products} paginationData={paginationData} />
  );
}
