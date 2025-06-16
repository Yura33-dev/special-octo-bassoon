import ModalWindow from '@/components/shared/modals/ModalWindow';
import { ADD_ORDER_ID } from '@/lib/constants';

import OrderForm from '../forms/OrderForm';

export default function OrderAddModal() {
  return (
    <ModalWindow
      initial={true}
      title='Додати нове замовлення'
      modalId={ADD_ORDER_ID}
      className='lg:max-w-[1000px]'
      isModalSlot
    >
      <OrderForm isAddForm />
    </ModalWindow>
  );
}
