import { formattedPrice } from '@/lib/utils';

import EditButton from '../../shared/EditButton';

interface IOrderFooterProps {
  orderId: string;
  totalPrice: number;
}

export default function OrderFooter({
  orderId,
  totalPrice,
}: IOrderFooterProps) {
  return (
    <div className='px-4 pb-4 mt-6 text-xl flex justify-between items-center'>
      <h3>
        Загальна сума рахунку:{' '}
        <span className='font-semibold'>{formattedPrice(totalPrice)}</span>
      </h3>

      <EditButton title='Внести зміни' href={`/dashboard/orders/${orderId}`} />
    </div>
  );
}
