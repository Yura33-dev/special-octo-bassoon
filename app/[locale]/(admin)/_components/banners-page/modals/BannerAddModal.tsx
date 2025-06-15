import ModalWindow from '@/components/shared/modals/ModalWindow';
import { ADD_BANNER_ID } from '@/lib/constants';

import BannersForm from '../forms/BannersForm';

export default function BannerAddModal() {
  return (
    <ModalWindow
      initial={true}
      title='Додати новий банер'
      modalId={ADD_BANNER_ID}
      className='lg:max-w-[900px]'
      isModalSlot
    >
      <BannersForm isAddForm />
    </ModalWindow>
  );
}
