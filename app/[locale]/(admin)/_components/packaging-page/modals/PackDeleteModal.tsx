import ModalWindow from '@/components/shared/modals/ModalWindow';
import { DELETE_PACKAGING_ID } from '@/lib/constants';

import PackDeleteForm from '../forms/PackDeleteForm';

interface IPackDeleteModalProps {
  packTitle: string;
  packId: string;
}

export default function PackDeleteModal({
  packTitle,
  packId,
}: IPackDeleteModalProps) {
  return (
    <ModalWindow
      title='Підтвердження'
      modalId={DELETE_PACKAGING_ID}
      className='lg:max-w-[600px]'
    >
      <PackDeleteForm packTitle={packTitle} packId={packId} />
    </ModalWindow>
  );
}
