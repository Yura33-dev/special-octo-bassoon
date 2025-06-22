import clsx from 'clsx';
import { SquareArrowOutUpRight } from 'lucide-react';

import { Link } from '@/i18n/routing';

interface IPageHeaderProps {
  title: string;
  length?: number;
  className?: string;
  htmlTitle?: boolean;
  link?: string;
}

export default function PageMainHeader({
  title,
  length,
  className,
  htmlTitle = false,
  link,
}: IPageHeaderProps) {
  if (htmlTitle) {
    return (
      <h1
        dangerouslySetInnerHTML={{ __html: title }}
        className={clsx('text-2xl', className && className)}
      ></h1>
    );
  }

  return (
    <h1
      className={clsx(
        'text-2xl font-semibold',
        link && 'flex gap-4 items-center',
        className && className
      )}
    >
      {title} {length && length > 0 ? `(${length})` : null}
      {link && (
        <span>
          <Link href={`/catalog/${link}`} target='_blank'>
            <SquareArrowOutUpRight className='w-5 h-5' />
          </Link>
        </span>
      )}
    </h1>
  );
}
