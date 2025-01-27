import Container from '@/components/shared/Container';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <section className='mt-20'>
      <Container>
        <h1 className='text-center text-2xl'>Not Found</h1>
        <p>Could not find requested resource</p>
        <Link href='/'>Return Home</Link>
      </Container>
    </section>
  );
}
