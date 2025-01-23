import { getLocale } from 'next-intl/server';

import { getAllProducts } from '@/lib/api';
import { locale } from '@/types';

import CatalogGrid from './CatalogGrid';

interface ICatalogProps {
  page: number;
}

export default async function Catalog({ page }: ICatalogProps) {
  const locale = (await getLocale()) as locale;
  const { products, paginationData } = await getAllProducts(locale, page);

  return <CatalogGrid products={products} paginationData={paginationData} />;
}
