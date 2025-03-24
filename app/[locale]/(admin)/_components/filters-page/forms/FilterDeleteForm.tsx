'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/routing';
import { deleteFilterById } from '@/lib/api';
import { DELETE_FILTER_ID } from '@/lib/constants';
import { useModalStore } from '@/providers';

import CancelButton from '../../shared/forms-elements/CancelButton';
import DeleteButton from '../../shared/forms-elements/DeleteButton';

interface IFilterDeleteFormProps {
  filterTitle: string;
  filterId: string;
}

export default function FilterDeleteForm({
  filterTitle,
  filterId,
}: IFilterDeleteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const closeModal = useModalStore(state => state.closeModal);
  const router = useRouter();

  const handleCancelButton = () => {
    closeModal(DELETE_FILTER_ID);
  };

  const handleDeleletePackaging = async (filterId: string) => {
    setIsSubmitting(true);

    try {
      await deleteFilterById(filterId);
      router.replace('/dashboard/filters');
      router.refresh();
      toast.success('Фільтр успішно видалено!');
      closeModal(DELETE_FILTER_ID);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Помилка при видалені фільтра');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <h3 className='text-lg mb-4'>
        Будь ласка, підтвердіть видалення фільтра{' '}
        <span className='font-bold'>`{filterTitle}`</span>
      </h3>
      <p className='text-base'>
        Фільтр буде автоматично видалений із всіх пов`язаних товарів
      </p>
      <div className='flex gap-4 items-center justify-center mt-6'>
        <DeleteButton
          onClick={() => handleDeleletePackaging(filterId)}
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
