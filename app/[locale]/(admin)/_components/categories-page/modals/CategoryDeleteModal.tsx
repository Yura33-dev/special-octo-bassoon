import ModalWindow from '@/components/shared/modals/ModalWindow';
import { DELETE_CATEGORY_ID } from '@/lib/constants';

import CategoryDeleteForm from '../forms/CategoryDeleteForm';

interface ICategoryDeleteModalProps {
  categoryId: string;
  categoryTitle: string;
}

export default function CategoryDeleteModal({
  categoryId,
  categoryTitle,
}: ICategoryDeleteModalProps) {
  return (
    <ModalWindow
      title='Підтвердження'
      modalId={DELETE_CATEGORY_ID}
      className='lg:max-w-[600px]'
    >
      <CategoryDeleteForm
        categoryId={categoryId}
        categoryTitle={categoryTitle}
      />
    </ModalWindow>
  );
}
