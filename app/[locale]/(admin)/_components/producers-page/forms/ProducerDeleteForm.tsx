'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/routing';
import { deleteProducerById } from '@/lib/api';
import { DELETE_PRODUCER_ID } from '@/lib/constants';
import { useModalStore } from '@/providers';

import CancelButton from '../../shared/forms-elements/CancelButton';
import DeleteButton from '../../shared/forms-elements/DeleteButton';

interface IProducerDeleteFormProps {
  producerTitle: string;
  producerId: string;
}

export default function ProducerDeleteForm({
  producerId,
  producerTitle,
}: IProducerDeleteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const closeModal = useModalStore(state => state.closeModal);
  const router = useRouter();

  const handleCancelButton = () => {
    closeModal(DELETE_PRODUCER_ID);
  };

  const handleDeleleteProducer = async (producerId: string) => {
    setIsSubmitting(true);

    try {
      await deleteProducerById(producerId);
      router.replace('/dashboard/producers');
      router.refresh();
      toast.success('Виробника успішно видалено!');
      closeModal(DELETE_PRODUCER_ID);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Помилка при видалені виробника');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h3 className='text-lg mb-4'>
        Будь ласка, підтвердіть видалення виробника{' '}
        <span className='font-bold'>`{producerTitle}`</span>
      </h3>
      <p className='text-base'>Після видалення, його відновити неможливо</p>
      <div className='flex gap-4 items-center justify-center mt-6'>
        <DeleteButton
          onClick={() => handleDeleleteProducer(producerId)}
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
