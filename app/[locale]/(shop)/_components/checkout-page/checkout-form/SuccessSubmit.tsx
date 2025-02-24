'use client';

import { Link } from '@/i18n/routing';
import { useModalStore } from '@/providers';

interface ISuccessSubmitProps {
  order: string | null;
  modalId?: string;
}
export default function SuccessSubmit({ modalId, order }: ISuccessSubmitProps) {
  const closeModal = useModalStore(state => state.closeModal);

  return (
    <>
      <p className='text-base mt-2'>
        Ми отримали ваш запит і вже збираємо його до відправки! <br /> <br />{' '}
        Номер замовлення:{' '}
        <span className='font-semibold'>{order ?? 'Помилка...'}</span>
      </p>

      <span className='flex gap-1.5 mt-5'>
        Повернутися на
        <Link
          href='/'
          className='underline text-primary'
          onClick={() => closeModal(modalId ?? '')}
        >
          головну сторінку
        </Link>
      </span>
    </>
  );
}
