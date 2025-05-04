'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/routing';
import { deleteProductById } from '@/lib/api';
import { DELETE_PRODUCT_ID } from '@/lib/constants';
import { useModalStore } from '@/providers';

import CancelButton from '../../shared/forms-elements/CancelButton';
import DeleteButton from '../../shared/forms-elements/DeleteButton';

interface IProductDeleteFormProps {
  productTitle: string;
  productId: string;
}

export default function ProductDeleteForm({
  productTitle,
  productId,
}: IProductDeleteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const closeModal = useModalStore(state => state.closeModal);
  const router = useRouter();

  const handleCancelButton = () => {
    closeModal(DELETE_PRODUCT_ID);
  };

  const handleDeleleteProduct = async (productId: string) => {
    setIsSubmitting(true);

    try {
      await Promise.all([
        deleteProductById(productId),
        fetch('/api/v1/admin/products/image', {
          method: 'DELETE',
          body: JSON.stringify({ productId }),
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      ]);

      router.replace('/dashboard/products');
      router.refresh();
      toast.success('Продукт успішно видалено!');
      closeModal(DELETE_PRODUCT_ID);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Помилка при видалені продукту');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h3 className='text-lg mb-4'>
        Будь ласка, підтвердіть видалення продукту{' '}
        <span className='font-bold'>`{productTitle}`</span>
      </h3>
      <p className='text-base'>Після видалення, продукт відновити неможливо</p>
      <div className='flex gap-4 items-center justify-center mt-6'>
        <DeleteButton
          onClick={() => handleDeleleteProduct(productId)}
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
