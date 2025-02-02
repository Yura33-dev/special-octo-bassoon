import { getAllCategories } from '@/lib/api';
import { locale } from '@/types';

import CategoriesList from './CategoriesList';

interface ICatalogNavBarProps {
  locale: locale;
}

export default async function CatalogNavBar({ locale }: ICatalogNavBarProps) {
  const categories = await getAllCategories(locale, {
    visible: true,
    main: true,
  });

  return <CategoriesList categories={categories} />;
}
