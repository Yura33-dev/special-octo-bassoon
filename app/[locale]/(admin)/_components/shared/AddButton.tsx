'use client';

import clsx from 'clsx';
import { CirclePlus } from 'lucide-react';

import { Link } from '@/i18n/routing';
import { useModalStore } from '@/providers';

interface IAddButtonProps {
  modalId: string;
  type: 'link' | 'button';
  href?: string;
  title?: string;
  className?: string;
}

export default function AddButton({
  modalId,
  type,
  href = '',
  title,
  className,
}: IAddButtonProps) {
  const openModal = useModalStore(state => state.openModal);

  if (type === 'link') {
    return (
      <Link
        href={href}
        onClick={() => openModal(modalId)}
        className={clsx(
          'text-sm p-2 bg-primary rounded-md font-semibold flex items-center gap-3 justify-center transition-colors hover:bg-primary-dark text-white',
          className && className
        )}
      >
        <span>{title ? title : 'Додати'}</span>
        <CirclePlus className='w-5 h-5' />
      </Link>
    );
  }

  return (
    <button
      className={clsx(
        'text-sm p-2 bg-primary rounded-md font-semibold flex items-center gap-3 justify-center transition-colors hover:bg-primary-dark text-white',
        className && className
      )}
      onClick={() => openModal(modalId)}
    >
      <span>{title ? title : 'Додати'}</span>
      <CirclePlus className='w-5 h-5' />
    </button>
  );
}
