import ModalWindow from '@/components/shared/modals/ModalWindow';
import { ADD_PRODUCER_ID } from '@/lib/constants';

import ProducerForm from '../forms/ProducerForm';

export default function ProducerAddModal() {
  return (
    <ModalWindow
      initial={true}
      title='Додати виробника'
      modalId={ADD_PRODUCER_ID}
      className='lg:max-w-[800px]'
      isModalSlot
    >
      <ProducerForm isAddForm />
    </ModalWindow>
  );
}
