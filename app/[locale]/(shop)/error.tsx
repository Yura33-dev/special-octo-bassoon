'use client';
import { useEffect } from 'react';

import Container from '@/components/shared/Container';
import { Link } from '@/i18n/routing';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className='h-full flex flex-col justify-center items-center'>
      <h1 className='text-2xl'>Упс, щось зламалося...</h1>
      <p className='my-10'>
        Сталася помилка в роботі сайту. Спробуйте оновиту сторінку або
        поверніться на головну
      </p>
      <button
        onClick={() => reset()}
        className='block mb-6 px-4 py-2 bg-primary rounded-md text-white transition-colors hover:bg-primary-dark'
      >
        Оновити
      </button>
      <Link href='/' className='border-b-2 border-primary-dark'>
        На головну сторінку
      </Link>
    </Container>
  );
}
