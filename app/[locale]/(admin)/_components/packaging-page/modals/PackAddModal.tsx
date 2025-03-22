import ModalWindow from '@/components/shared/modals/ModalWindow';
import { ADD_PACKAGING_ID } from '@/lib/constants';

import PackAddForm from '../forms/PackAddForm';

export default function PackAddModal() {
  return (
    <ModalWindow
      initial={true}
      title='Додати нове пакування'
      modalId={ADD_PACKAGING_ID}
      className='lg:max-w-[800px]'
      isModalSlot
    >
      <PackAddForm />
    </ModalWindow>
  );
}
