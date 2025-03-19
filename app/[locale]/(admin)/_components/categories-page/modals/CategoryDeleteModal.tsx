import CategoryDeleteForm from '../forms/CategoryDeleteForm';

interface ICategoryDeleteModalProps {
  categoryId: string;
  categoryTitle: string;
}

export default function CategoryDeleteModal({
  categoryId,
  categoryTitle,
}: ICategoryDeleteModalProps) {
  return (
    <CategoryDeleteForm categoryId={categoryId} categoryTitle={categoryTitle} />
  );
}
