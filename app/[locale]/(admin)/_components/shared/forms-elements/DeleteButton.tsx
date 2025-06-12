import clsx from 'clsx';
import { Archive, LoaderCircle, Trash2 } from 'lucide-react';

interface IDeleteButtonProps {
  isSubmitting: boolean;
  onClick: () => void;
  toArchive?: boolean;
  title?: string | null;
  withoutSpinner?: boolean;
  className?: string;
}

export default function DeleteButton({
  isSubmitting,
  onClick,
  toArchive = false,
  title = 'Видалити',
  withoutSpinner = false,
  className,
}: IDeleteButtonProps) {
  return (
    <button
      type='button'
      className={clsx(
        'flex justify-center items-center bg-teal-800/20 transition-all px-4 py-2 rounded-md hover:bg-red-600',
        'hover:text-white disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:text-black',
        title && title.length > 1 && 'gap-2',
        className && className
      )}
      disabled={isSubmitting}
      onClick={onClick}
    >
      {isSubmitting && !withoutSpinner ? (
        <LoaderCircle className='w-6 h-6 text-primary animate-spin' />
      ) : (
        <>
          {toArchive ? (
            <Archive className='w-4 h-4' aria-hidden focusable='false' />
          ) : (
            <Trash2 className='w-4 h-4' aria-hidden focusable='false' />
          )}
          <span>{title}</span>
        </>
      )}
    </button>
  );
}
