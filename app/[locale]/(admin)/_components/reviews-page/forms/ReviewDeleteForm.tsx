'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/routing';
import { deleteReviewById } from '@/lib/api';

import CancelButton from '../../shared/forms-elements/CancelButton';
import DeleteButton from '../../shared/forms-elements/DeleteButton';

interface IReviewDeleteFormProps {
  reviewId: string;
  authorName: string;
  onClose: () => void;
}

export default function ReviewDeleteForm({
  reviewId,
  authorName,
  onClose,
}: IReviewDeleteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteReviewById(reviewId);
      router.refresh();
      toast.success('Відгук видалено');
      onClose();
    } catch {
      toast.error('Помилка при видаленні відгуку. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className='text-lg mb-4'>
        Підтвердіть видалення відгуку від{' '}
        <span className='font-bold'>`{authorName}`</span>
      </h3>
      <p className='text-base'>Після видалення відгук відновити неможливо</p>
      <div className='flex gap-4 items-center justify-center mt-6'>
        <DeleteButton onClick={handleDelete} isSubmitting={isSubmitting} />
        <CancelButton onClick={onClose} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}
