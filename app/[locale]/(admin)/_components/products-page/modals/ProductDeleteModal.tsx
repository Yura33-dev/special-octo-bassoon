import ModalWindow from '@/components/shared/modals/ModalWindow';
import { DELETE_PRODUCT_ID } from '@/lib/constants';

import ProductDeleteForm from '../forms/ProductDeleteForm';

interface IProductDeleteModalProps {
  productTitle: string;
  productId: string;
}

export default function ProductDeleteModal({
  productTitle,
  productId,
}: IProductDeleteModalProps) {
  return (
    <ModalWindow
      title='Підтвердження'
      modalId={DELETE_PRODUCT_ID}
      className='lg:max-w-[600px]'
    >
      <ProductDeleteForm productTitle={productTitle} productId={productId} />
    </ModalWindow>
  );
}
