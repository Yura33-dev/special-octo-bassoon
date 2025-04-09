'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/routing';
import { deleteCategoryById } from '@/lib/api';
import { DELETE_CATEGORY_ID } from '@/lib/constants';
import { useModalStore } from '@/providers';

import CancelButton from '../../shared/forms-elements/CancelButton';
import DeleteButton from '../../shared/forms-elements/DeleteButton';

interface ICategoryDeleteFormProps {
  categoryId: string;
  categoryTitle: string;
}

export default function CategoryDeleteForm({
  categoryId,
  categoryTitle,
}: ICategoryDeleteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const closeModal = useModalStore(state => state.closeModal);
  const router = useRouter();

  const handleCancelButton = () => {
    closeModal(DELETE_CATEGORY_ID);
  };

  const handleDeleleteCategory = async (categoryId: string) => {
    setIsSubmitting(true);

    try {
      await deleteCategoryById(categoryId);
      router.replace('/dashboard/categories');
      router.refresh();
      toast.success('Категорія успішно видалена!');
      closeModal(DELETE_CATEGORY_ID);
    } catch (error: unknown) {
      toast.error('Помилка при видаленні категорії. Спробуйте ще раз');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className='text-lg mb-4'>
        Будь ласка, підтвердіть видалення категорії{' '}
        <span className='font-bold'>`{categoryTitle}`</span>
      </h3>
      <p className='text-base'>
        Після видалення, категорію відновити неможливо
      </p>
      <div className='flex gap-4 items-center justify-center mt-6'>
        <DeleteButton
          onClick={() => handleDeleleteCategory(categoryId)}
          isSubmitting={isSubmitting}
        />
        <CancelButton
          onClick={handleCancelButton}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
