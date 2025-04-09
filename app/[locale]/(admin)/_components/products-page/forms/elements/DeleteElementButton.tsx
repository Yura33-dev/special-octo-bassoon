import clsx from 'clsx';
import { Trash2 } from 'lucide-react';

interface IDeleteElementButtonProps {
  title: string;
  onClick: () => void;
  className?: string;
}

export default function DeleteElementButton({
  title,
  onClick,
  className,
}: IDeleteElementButtonProps) {
  return (
    <button
      aria-label={`Видалити ${title}`}
      type='button'
      onClick={onClick}
      className={clsx(
        'bg-red-700 flex items-center justify-center w-max h-max p-2.5 rounded-md transition-colors hover:bg-red-800 text-white shrink-0',
        className && className
      )}
    >
      <Trash2 className='w-5 h-5' aria-hidden={true} focusable={false} />
    </button>
  );
}
