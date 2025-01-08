import clsx from 'clsx';
import Link from 'next/link';

interface ILogoProps {
  title?: string;
  className?: string;
}

export default function Logo({ title = 'ProGround', className }: ILogoProps) {
  return (
    <Link
      aria-label='Посилання на головну сторінку'
      href='/'
      className={clsx(
        `font-bold relative max-w-max
          focus-visible:outline-none focus-visible:ring-0
                
          transition-colors
          before:content-[''] before:absolute before:bottom-2 before:left-1/2 before:translate-x-[-50%] before:w-full before:h-[2px]
          before:bg-accent before:max-w-0 before:transition-[max-width] lg:hover:before:max-w-full
          focus-visible:before:max-w-full`,
        className
      )}
    >
      {title}
    </Link>
  );
}
