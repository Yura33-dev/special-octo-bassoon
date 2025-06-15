import ModalWindow from '@/components/shared/modals/ModalWindow';
import { ADD_CATEGORY_ID } from '@/lib/constants';

import CategoryForm from '../forms/CategoryForm';

export default function CategoryAddModal() {
  return (
    <ModalWindow
      initial={true}
      title='Додати нову категорію'
      modalId={ADD_CATEGORY_ID}
      className='lg:max-w-[900px]'
      isModalSlot
    >
      <CategoryForm isAddForm />
    </ModalWindow>
  );
}
