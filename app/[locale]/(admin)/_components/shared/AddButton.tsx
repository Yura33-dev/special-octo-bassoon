'use client';

import clsx from 'clsx';
import { CirclePlus } from 'lucide-react';

import { useModalStore } from '@/providers';

interface IAddButtonProps {
  modalId: string;
  title?: string;
  className?: string;
}

export default function AddButton({
  modalId,
  title,
  className,
}: IAddButtonProps) {
  const openModal = useModalStore(state => state.openModal);

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
