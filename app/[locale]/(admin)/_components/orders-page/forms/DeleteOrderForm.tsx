'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { deleteOrderById } from '@/lib/api';
import { DELETE_ORDER_ID } from '@/lib/constants';
import { useModalStore } from '@/providers';

import DeleteButton from '../../shared/forms-elements/DeleteButton';

interface IDeleteOrderFormProps {
  orderId: string;
  orderNumber: string;
}

export default function DeleteOrderForm({
  orderId,
  orderNumber,
}: IDeleteOrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const closeModal = useModalStore(state => state.closeModal);

  const handleDeleteOrder = async () => {
    setIsSubmitting(true);

    try {
      await deleteOrderById(orderId);
      toast.success('Замовлення успішно видалено!');
      closeModal(DELETE_ORDER_ID);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Помилка при видаленні замолвення');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h3 className='text-lg mb-4'>
        Будь ласка, підтвердіть видалення замовлення{' '}
        <span className='font-bold'>`{orderNumber}`</span>
      </h3>
      <p className='text-base'>
        Після цього відновити замовлення буде неможливо. Це також впливатиме на
        статистику продажів магазину.
      </p>
      <div className='flex gap-4 items-center justify-center mt-6'>
        <DeleteButton onClick={handleDeleteOrder} isSubmitting={isSubmitting} />
      </div>
    </>
  );
}
