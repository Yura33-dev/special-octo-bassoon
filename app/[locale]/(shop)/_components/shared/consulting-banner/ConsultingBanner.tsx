import Container from '@/components/shared/Container';

export default function ConsultingBanner() {
  return (
    <Container className='mt-20'>
      <div className='bg-gradient-to-r from-green-600 to-green-800 p-4 sm:p-8 rounded-xl flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center shadow-md'>
        <div className='sm:mr-3'>
          <span className='text-2xl text-white font-semibold inline-block mb-4 sm:mb-2'>
            Потрібна консультація?
          </span>
          <p className='text-base text-white'>
            Залиште свій номер телефону і менеджер зателефонує вам найближчим
            часом
          </p>
        </div>
        <button
          type='button'
          className='btn bg-accent border-none transition-all duration-150 hover:bg-primary hover:text-white'
        >
          Замовити дзвінок
        </button>
      </div>
    </Container>
  );
}
