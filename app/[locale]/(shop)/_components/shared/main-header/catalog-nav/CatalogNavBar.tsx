import { getAllCategories } from '@/lib/api/categories/getAllCategories';
import { locale } from '@/types';

import CategoriesList from './CategoriesList';

interface ICatalogNavBarNewProps {
  locale: locale;
}

export default async function CatalogNavBarNew({
  locale,
}: ICatalogNavBarNewProps) {
  const categories = await getAllCategories(locale);

  return <CategoriesList categories={categories} />;
}
