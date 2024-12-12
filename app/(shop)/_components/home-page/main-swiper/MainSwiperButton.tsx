import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MutableRefObject } from 'react';

interface IMainSwiperButtonProps {
  to: 'next' | 'prev';
  btnRef: MutableRefObject<HTMLButtonElement | null>;
}

export default function MainSwiperButton({
  to,
  btnRef,
}: IMainSwiperButtonProps) {
  return (
    <button
      ref={btnRef}
      className={clsx(
        `hidden sm:inline-flex btn border-none h-auto absolute top-1/2 z-[2]
          bg-primary rounded-md p-2 transition-all duration-150 
          md:hover:bg-green-800`,
        to === 'next' ? 'right-4' : 'left-4'
      )}
    >
      {to === 'next' ? (
        <ChevronRight color='white' className='w-6 h-6 md:w-10 md:h-10' />
      ) : (
        <ChevronLeft color='white' className='w-6 h-6 md:w-10 md:h-10' />
      )}
    </button>
  );
}
