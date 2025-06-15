import ModalWindow from '@/components/shared/modals/ModalWindow';
import { ARCHIVE_ORDER_ID } from '@/lib/constants';

import ArchiveOrderForm from '../forms/ArchiveOrderForm';

interface IArchiveOrderModalProps {
  orderId: string;
  orderNumber: string;
}
export default function ArchiveOrderModal({
  orderId,
  orderNumber,
}: IArchiveOrderModalProps) {
  return (
    <ModalWindow
      initial={true}
      title='Додати товари'
      modalId={ARCHIVE_ORDER_ID}
      className='lg:max-w-[600px]'
      withoutBackdrop
    >
      <ArchiveOrderForm orderId={orderId} orderNumber={orderNumber} />
    </ModalWindow>
  );
}
