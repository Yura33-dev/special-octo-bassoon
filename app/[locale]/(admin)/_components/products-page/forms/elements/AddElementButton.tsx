import clsx from 'clsx';
import { CirclePlus } from 'lucide-react';

interface IAddElementButtonProps {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export default function AddElementButton({
  title,
  onClick,
  disabled = false,
  className,
}: IAddElementButtonProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={clsx(
        'w-max h-max   flex items-center justify-center p-2 rounded-md transition-colors mb-4',
        disabled ? 'bg-gray-400' : 'bg-primary hover:bg-primary-dark',
        className && className
      )}
      aria-label={`Додати ${title}`}
      disabled={disabled}
    >
      <CirclePlus
        className='w-5 h-5 text-white'
        aria-hidden={true}
        focusable={false}
      />
    </button>
  );
}
