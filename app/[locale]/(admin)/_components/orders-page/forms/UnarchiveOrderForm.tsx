'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { archiveOrderById } from '@/lib/api';

import DeleteButton from '../../shared/forms-elements/DeleteButton';

interface IUnarchiveOrderFormProps {
  orderId: string;
  orderNumber: string;
}

export default function UnarchiveOrderForm({
  orderId,
  orderNumber,
}: IUnarchiveOrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleUnarchiveOrder = async () => {
    setIsSubmitting(true);

    try {
      await archiveOrderById(orderId, false);
      toast.success('Замовлення успішно повернуто в загальний список!');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Помилка при розархівуванні замолвення');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h3 className='text-lg mb-4'>
        Будь ласка, підтвердіть розархівування замовлення{' '}
        <span className='font-bold'>`{orderNumber}`</span>
      </h3>
      <p className='text-base'>
        Надалі це замовлення буде відображатися в загальному списку
      </p>
      <div className='flex gap-4 items-center justify-center mt-6'>
        <DeleteButton
          title='Розархівувати'
          toArchive
          onClick={handleUnarchiveOrder}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  );
}
