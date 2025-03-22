import { LoaderCircle, Trash2 } from 'lucide-react';

interface IDeleteButtonProps {
  isSubmitting: boolean;
  title?: string;
  withoutSpinner?: boolean;
  onClick: () => void;
}

export default function DeleteButton({
  onClick,
  title,
  isSubmitting,
  withoutSpinner = false,
}: IDeleteButtonProps) {
  return (
    <button
      type='button'
      className='min-w-[125px] flex justify-center items-center gap-2 bg-teal-800/20 transition-all px-4 py-2 rounded-md hover:bg-red-600
                  hover:text-white disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:text-black'
      disabled={isSubmitting}
      onClick={onClick}
    >
      {isSubmitting && !withoutSpinner ? (
        <LoaderCircle className='w-6 h-6 text-primary animate-spin' />
      ) : (
        <>
          <Trash2 className='w-4 h-4' />
          <span>{title || 'Видалити'}</span>
        </>
      )}
    </button>
  );
}
