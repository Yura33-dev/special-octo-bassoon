'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/routing';
import { deleteSlideById } from '@/lib/api';
import { DELETE_BANNER_ID } from '@/lib/constants';
import { useModalStore } from '@/providers';

import CancelButton from '../../shared/forms-elements/CancelButton';
import DeleteButton from '../../shared/forms-elements/DeleteButton';

interface IBannerDeleteFormProps {
  bannerId: string;
  bannerTitle: string;
}

export default function BannerDeleteForm({
  bannerId,
  bannerTitle,
}: IBannerDeleteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const closeModal = useModalStore(state => state.closeModal);
  const router = useRouter();

  const handleCancelButton = () => {
    closeModal(DELETE_BANNER_ID);
  };

  const handleDeleleteBanner = async (bannerId: string) => {
    setIsSubmitting(true);

    try {
      await deleteSlideById(bannerId);
      router.replace('/dashboard/banners');
      router.refresh();
      toast.success('Банер успішно видалений!');
      closeModal(DELETE_BANNER_ID);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Помилка при видаленні банеру. Спробуйте ще раз');
      }
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h3 className='text-lg mb-4'>
        Будь ласка, підтвердіть видалення банеру{' '}
        <span className='font-bold'>`{bannerTitle}`</span>
      </h3>
      <p className='text-base'>Після видалення, банер відновити неможливо</p>
      <div className='flex gap-4 items-center justify-center mt-6'>
        <DeleteButton
          onClick={() => handleDeleleteBanner(bannerId)}
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
