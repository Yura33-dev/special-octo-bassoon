import Container from '@/components/shared/Container';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <section className='mt-20'>
      <Container>
        <h1 className='text-center text-2xl mb-5'>Упс, сторінка не знайдена</h1>
        <p className='text-center'>
          Хтось видалив данні або щось пішло не так, спробуйте зайти на сторінку
          пізніше
        </p>
        <Link
          href='/'
          className='bg-primary text-white px-4 py-2 rounded-md block mx-auto mt-6 w-max'
        >
          Повернутися на головну
        </Link>
      </Container>
    </section>
  );
}
