'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/routing';
import { archiveOrderById } from '@/lib/api';
import { ARCHIVE_ORDER_ID } from '@/lib/constants';
import { useModalStore } from '@/providers';

import CancelButton from '../../shared/forms-elements/CancelButton';
import DeleteButton from '../../shared/forms-elements/DeleteButton';

interface IArchiveOrderFormProps {
  orderId: string;
  orderNumber: string;
}

export default function ArchiveOrderForm({
  orderId,
  orderNumber,
}: IArchiveOrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const closeModal = useModalStore(state => state.closeModal);
  const router = useRouter();

  const handleCancelButton = () => {
    closeModal(ARCHIVE_ORDER_ID);
  };

  const handleArchiveOrder = async () => {
    setIsSubmitting(true);

    try {
      await archiveOrderById(orderId, true);
      toast.success('Замовлення успішно архівовано!');
      closeModal(ARCHIVE_ORDER_ID);
      router.push('/dashboard/orders');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Помилка при архівуванні замолвення');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h3 className='text-lg mb-4'>
        Будь ласка, підтвердіть архівування замовлення{' '}
        <span className='font-bold'>`{orderNumber}`</span>
      </h3>
      <p className='text-base'>
        Надалі це замовлення не буде відображатися в загальному списку
      </p>
      <div className='flex gap-4 items-center justify-center mt-6'>
        <DeleteButton
          title='Архівувати'
          toArchive
          onClick={handleArchiveOrder}
          isSubmitting={isSubmitting}
        />
        <CancelButton
          onClick={handleCancelButton}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  );
}
