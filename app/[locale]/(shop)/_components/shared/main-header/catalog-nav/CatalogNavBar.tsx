import { getAllCategories } from '@/lib/api';

import CategoriesList from './CategoriesList';

export default async function CatalogNavBar() {
  const categories = await getAllCategories({
    visible: true,
    main: true,
  });

  return <CategoriesList categories={categories} />;
}
