import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MutableRefObject } from 'react';

interface INewProductsSwiperButtonProps {
  to: 'next' | 'prev';
  btnRef: MutableRefObject<HTMLButtonElement | null>;
  disabled: boolean;
}

export default function NewProductsSwiperButton({
  to,
  btnRef,
  disabled,
}: INewProductsSwiperButtonProps) {
  return (
    <button
      ref={btnRef}
      className={clsx(
        'flex justify-center items-center bg-primary p-2 rounded-md transition-colors duration-150',
        disabled && 'bg-slate-300',
        !disabled && 'md:hover:bg-accent'
      )}
      disabled={disabled}
    >
      {to === 'next' ? (
        <ChevronRight color='white' className='w-6 h-6 md:w-8 md:h-8' />
      ) : (
        <ChevronLeft color='white' className='w-6 h-6 md:w-8 md:h-8' />
      )}
    </button>
  );
}
