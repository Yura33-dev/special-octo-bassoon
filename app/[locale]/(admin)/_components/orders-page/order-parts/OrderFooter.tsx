'use client';

import { usePathname } from '@/i18n/routing';
import { formattedPrice } from '@/lib/utils';

import EditButton from '../../shared/EditButton';
import DeleteButton from '../../shared/forms-elements/DeleteButton';

interface IOrderFooterProps {
  orderId: string;
  totalPrice: number;
  setIsSelectedOrderToDelete: (value: boolean) => void;
  setIsSelectedOrderToUnarchive: (value: boolean) => void;
}

export default function OrderFooter({
  orderId,
  totalPrice,
  setIsSelectedOrderToDelete,
  setIsSelectedOrderToUnarchive,
}: IOrderFooterProps) {
  const pathName = usePathname();

  const handleDeleteButton = () => {
    setIsSelectedOrderToDelete(true);
  };

  const handleBackFromArchive = () => {
    setIsSelectedOrderToUnarchive(true);
  };

  return (
    <div className='px-4 pb-4 mt-6 text-xl flex justify-between items-center'>
      <h3>
        Загальна сума рахунку:{' '}
        <span className='font-semibold'>{formattedPrice(totalPrice)}</span>
      </h3>

      {!pathName.includes('archive') ? (
        <EditButton
          title={'Редагувати'}
          href={`/dashboard/orders/${orderId}`}
        />
      ) : (
        <div className='flex gap-4 text-sm '>
          <button
            type='button'
            className='p-2 bg-primary text-white rounded-md flex justify-center items-center gap-3 transition-colors hover:bg-primary-dark'
            onClick={handleBackFromArchive}
          >
            Розархівувати
          </button>

          <DeleteButton
            onClick={handleDeleteButton}
            isSubmitting={false}
            withoutSpinner
          />
        </div>
      )}
    </div>
  );
}
