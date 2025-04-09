import ModalWindow from '@/components/shared/modals/ModalWindow';
import { ADD_SUBCATEGORY_ID } from '@/lib/constants';
import { ICategoryMapped } from '@/types';

import SubcategoriesList from '../SubcategoriesList';

interface INestedCategoryAddModalProps {
  availableSubcategories: Array<ICategoryMapped>;
  baseCategoryId: string;
  main: boolean;
}

export default function NestedCategoryAddModal({
  availableSubcategories,
  baseCategoryId,
  main,
}: INestedCategoryAddModalProps) {
  return (
    <ModalWindow
      title='Додати категорію'
      modalId={ADD_SUBCATEGORY_ID}
      className='lg:max-w-[500px]'
    >
      <SubcategoriesList
        availableSubcategories={availableSubcategories}
        baseCategoryId={baseCategoryId}
        main={main}
      />
    </ModalWindow>
  );
}
