'use client';

import { MoveLeft } from 'lucide-react';

import { Link, useRouter } from '@/i18n/routing';

interface IBackButtonProps {
  href?: string;
  title?: string;
}
export default function BackButton({
  title = 'Назад',
  href,
}: IBackButtonProps) {
  const router = useRouter();

  const handleBackButton = () => {
    router.back();
  };

  if (href) {
    return (
      <Link
        href={href}
        className='flex justify-start items-center gap-4 mb-5 max-w-max rounded-md p-2 transition-colors
                      hover:bg-primary hover:text-white'
      >
        <MoveLeft className='w-5 h-5' />
        <span>{title}</span>
      </Link>
    );
  }

  return (
    <button
      onClick={handleBackButton}
      className='flex justify-start items-center gap-4 mb-5 max-w-max rounded-md p-2 transition-colors
                      hover:bg-primary hover:text-white'
    >
      <MoveLeft className='w-5 h-5' />
      <span>{title}</span>
    </button>
  );
}
