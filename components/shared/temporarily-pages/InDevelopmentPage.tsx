import Container from '@/components/shared/Container';

interface InDevelopmentPageProps {
  title?: string;
}

export default function InDevelopmentPage({ title }: InDevelopmentPageProps) {
  const titleParsed = title ? title : 'ця';

  return (
    <section className='mt-10'>
      <Container>
        <h1 className='text-xl font-semibold text-center uppercase'>
          Сторінка неактивна
        </h1>
        <p className='text-center mt-6'>
          Наразі <span className='font-bold'>{titleParsed}</span> сторінка
          знаходиться <span className='underline'>в розробці</span>.
          <br /> <br /> Але вже найближчим часом вона стане доступною і ви
          зможете нею користуватися. 🚀
          <br />
          <br />
          Дочекайтеся! 😉
        </p>
      </Container>
    </section>
  );
}
