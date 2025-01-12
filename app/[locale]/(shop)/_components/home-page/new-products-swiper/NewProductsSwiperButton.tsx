import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MutableRefObject } from 'react';

interface INewProductsSwiperButtonProps {
  to: 'next' | 'prev';
  btnRef: MutableRefObject<HTMLButtonElement | null>;
}

export default function NewProductsSwiperButton({
  to,
  btnRef,
}: INewProductsSwiperButtonProps) {
  return (
    <button
      ref={btnRef}
      className={
        'flex bg-primary p-2 rounded-md disabled:bg-slate-300 justify-center items-center transition-colors duration-150 md:hover:bg-accent'
      }
    >
      {to === 'next' ? (
        <ChevronRight color='white' className='w-6 h-6 md:w-8 md:h-8' />
      ) : (
        <ChevronLeft color='white' className='w-6 h-6 md:w-8 md:h-8' />
      )}
    </button>
  );
}
