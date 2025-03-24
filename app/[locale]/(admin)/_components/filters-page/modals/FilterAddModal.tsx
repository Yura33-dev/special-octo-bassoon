import ModalWindow from '@/components/shared/modals/ModalWindow';
import { ADD_FILTER_ID } from '@/lib/constants';

import FilterAddForm from '../forms/FilterAddForm';

export default function FilterAddModal() {
  return (
    <ModalWindow
      initial={true}
      title='Додати новий фільтр'
      modalId={ADD_FILTER_ID}
      className='lg:max-w-[900px]'
      isModalSlot
    >
      <FilterAddForm />
    </ModalWindow>
  );
}
