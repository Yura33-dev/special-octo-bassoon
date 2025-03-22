'use client';

interface ICancelButtonProps {
  title?: string;
  onClick: () => void;
  isSubmitting: boolean;
}

export default function CancelButton({
  title = 'Назад',
  onClick,
  isSubmitting,
}: ICancelButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      disabled={isSubmitting}
      className='bg-gray-300 px-10 py-2 rounded-md transition-colors hover:bg-gray-400
                disabled:cursor-not-allowed'
    >
      {title}
    </button>
  );
}
