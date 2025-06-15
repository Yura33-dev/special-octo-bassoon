import ModalWindow from '@/components/shared/modals/ModalWindow';
import { ADD_PRODUCTS_IN_ORDER } from '@/lib/constants';

import AddProductsForm from '../forms/AddProductsForm';

export default function AddProductsModal() {
  return (
    <ModalWindow
      initial={true}
      title='Додати товари'
      modalId={ADD_PRODUCTS_IN_ORDER}
      className='lg:max-w-[600px] shadow-lg'
      withoutBackdrop
    >
      <AddProductsForm />
    </ModalWindow>
  );
}
