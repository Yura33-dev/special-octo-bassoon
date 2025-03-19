'use client';

import { MoveLeft } from 'lucide-react';

import { useRouter } from '@/i18n/routing';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className='text-white bg-primary rounded-md p-2 flex items-center gap-2 mb-5 text-sm transition-colors hover:bg-primary-dark'
    >
      <MoveLeft />
      <span>Назад</span>
    </button>
  );
}
