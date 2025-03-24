import ModalWindow from '@/components/shared/modals/ModalWindow';
import { DELETE_FILTER_ID } from '@/lib/constants';

import FilterDeleteForm from '../forms/FilterDeleteForm';

interface IFilterDeleteModalProps {
  filterTitle: string;
  filterId: string;
}

export default function FilterDeleteModal({
  filterTitle,
  filterId,
}: IFilterDeleteModalProps) {
  return (
    <ModalWindow
      title='Підтвердження'
      modalId={DELETE_FILTER_ID}
      className='lg:max-w-[600px]'
    >
      <FilterDeleteForm filterTitle={filterTitle} filterId={filterId} />
    </ModalWindow>
  );
}
