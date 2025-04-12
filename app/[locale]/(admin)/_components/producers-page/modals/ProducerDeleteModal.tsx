import ModalWindow from '@/components/shared/modals/ModalWindow';
import { DELETE_PRODUCER_ID } from '@/lib/constants';

import ProducerDeleteForm from '../forms/ProducerDeleteForm';

interface IProducerDeleteModalProps {
  producerTitle: string;
  producerId: string;
}

export default function ProducerDeleteModal({
  producerId,
  producerTitle,
}: IProducerDeleteModalProps) {
  return (
    <ModalWindow
      title='Підтвердження'
      modalId={DELETE_PRODUCER_ID}
      className='lg:max-w-[600px]'
    >
      <ProducerDeleteForm
        producerId={producerId}
        producerTitle={producerTitle}
      />
    </ModalWindow>
  );
}
