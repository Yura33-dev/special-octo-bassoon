'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/routing';
import { deletePackagingById } from '@/lib/api';
import { DELETE_PACKAGING_ID } from '@/lib/constants';
import { useModalStore } from '@/providers';

import CancelButton from '../../shared/forms-elements/CancelButton';
import DeleteButton from '../../shared/forms-elements/DeleteButton';

interface IPackDeleteFormProps {
  packTitle: string;
  packId: string;
}

export default function PackDeleteForm({
  packId,
  packTitle,
}: IPackDeleteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const closeModal = useModalStore(state => state.closeModal);
  const router = useRouter();

  const handleCancelButton = () => {
    closeModal(DELETE_PACKAGING_ID);
  };

  const handleDeleletePackaging = async (packId: string) => {
    setIsSubmitting(true);

    try {
      await deletePackagingById(packId);
      toast.success('Пакування успішно видалено!');
      closeModal(DELETE_PACKAGING_ID);
      router.push('/dashboard/packaging');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Помилка при видалені пакування');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h3 className='text-lg mb-4'>
        Будь ласка, підтвердіть видалення пакування{' '}
        <span className='font-bold'>`{packTitle}`</span>
      </h3>
      <p className='text-base'>
        Після видалення, пакування відновити неможливо
      </p>
      <div className='flex gap-4 items-center justify-center mt-6'>
        <DeleteButton
          onClick={() => handleDeleletePackaging(packId)}
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
