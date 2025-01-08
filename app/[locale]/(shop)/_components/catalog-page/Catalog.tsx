import { getAllProducts } from '@/lib/api';
import { locale } from '@/types';

import CatalogGrid from './CatalogGrid';

interface ICatalogProps {
  locale: locale;
  page: number;
}

export default async function Catalog({ locale, page }: ICatalogProps) {
  const { products, paginationData } = await getAllProducts(locale, page);

  return <CatalogGrid products={products} paginationData={paginationData} />;
}
