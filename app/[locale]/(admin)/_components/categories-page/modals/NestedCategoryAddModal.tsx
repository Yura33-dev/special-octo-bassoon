import { ICategory } from '@/types';

import SubcategoriesList from '../SubcategoriesList';

interface INestedCategoryAddModalProps {
  availableSubcategories: Array<ICategory>;
  baseCategoryId: string;
  main: boolean;
}

export default function NestedCategoryAddModal({
  availableSubcategories,
  baseCategoryId,
  main,
}: INestedCategoryAddModalProps) {
  return (
    <SubcategoriesList
      availableSubcategories={availableSubcategories}
      baseCategoryId={baseCategoryId}
      main={main}
    />
  );
}
