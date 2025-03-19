'use client';

import clsx from 'clsx';
import { Pencil } from 'lucide-react';

import { Link } from '@/i18n/routing';

interface IEditButtonProps {
  title?: string;
  href: string;
  classNameBtn?: string;
}

export default function EditButton({
  href,
  title,
  classNameBtn,
}: IEditButtonProps) {
  return (
    <div
      className={clsx(
        'flex justify-center gap-2 text-sm',
        classNameBtn && classNameBtn
      )}
    >
      <Link
        href={href}
        className='p-2 bg-primary text-white rounded-md flex justify-center items-center gap-3 flex-1 transition-colors hover:bg-primary-dark'
      >
        <Pencil className='w-4 h-4' />
        {title ? <span>{title}</span> : null}
      </Link>
    </div>
  );
}
