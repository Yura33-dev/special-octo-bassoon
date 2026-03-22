import ModalWindow from '@/components/shared/modals/ModalWindow';
import { DELETE_REVIEW_ID } from '@/lib/constants';

import ReviewDeleteForm from '../forms/ReviewDeleteForm';

interface IReviewDeleteModalProps {
  reviewId: string;
  authorName: string;
  onClose: () => void;
}

export default function ReviewDeleteModal({
  reviewId,
  authorName,
  onClose,
}: IReviewDeleteModalProps) {
  return (
    <ModalWindow
      title='Підтвердження'
      modalId={DELETE_REVIEW_ID}
      className='lg:max-w-[600px]'
    >
      <ReviewDeleteForm
        reviewId={reviewId}
        authorName={authorName}
        onClose={onClose}
      />
    </ModalWindow>
  );
}
