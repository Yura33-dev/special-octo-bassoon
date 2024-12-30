import { config } from '@/lib/config';
import { IPagination, IProduct, locale } from '@/types';

import CatalogGrid from './CatalogGrid';

interface ICatalogProps {
  locale: locale;
  page: number;
}

const fetchAllProducts = async (
  page: number,
  locale: locale
): Promise<{ products: Array<IProduct>; paginationData: IPagination }> => {
  const res = await fetch(
    `${config.NEXT_PUBLIC_APP_URL}/api/products?locale=${locale}&page=${page}`
  );
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const data: { products: Array<IProduct>; paginationData: IPagination } =
    await res.json();

  return { products: data.products, paginationData: data.paginationData };
};

export default async function Catalog({ locale, page }: ICatalogProps) {
  const { products, paginationData } = await fetchAllProducts(page, locale);

  return <CatalogGrid products={products} paginationData={paginationData} />;
}
