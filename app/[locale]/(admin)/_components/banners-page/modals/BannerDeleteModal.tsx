import ModalWindow from '@/components/shared/modals/ModalWindow';
import { DELETE_BANNER_ID } from '@/lib/constants';

import BannerDeleteForm from '../forms/BannerDeleteForm';

interface IBannerDeleteModalProps {
  bannerId: string;
  bannerTitle: string;
}

export default function BannerDeleteModal({
  bannerId,
  bannerTitle,
}: IBannerDeleteModalProps) {
  return (
    <ModalWindow
      title='Підтвердження'
      modalId={DELETE_BANNER_ID}
      className='lg:max-w-[600px]'
    >
      <BannerDeleteForm bannerId={bannerId} bannerTitle={bannerTitle} />
    </ModalWindow>
  );
}
