import Container from '@/components/shared/Container';

export default function ProductsPageSkeleton() {
  return (
    <Container>
      <ul className='flex justify-between'>
        <li className='w-44 h-8 bg-gray-300 animate-pulse'></li>
        <li className='w-24 h-9 bg-gray-300 animate-pulse rounded-md'></li>
      </ul>

      <ul className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        <li className='bg-white rounded-md h-[600px] p-2 flex flex-col justify-between'>
          <div>
            <div className='h-40 bg-gray-300 rounded-md animate-pulse'></div>
            <div className='mt-4 h-7 w-44 bg-gray-300 animate-pulse'></div>
            <div className='mt-2 h-5 bg-gray-300 animate-pulse'></div>

            <div className='mt-6 h-5 w-52 bg-gray-300 animate-pulse'></div>
            <div className='mt-2 h-5 w-36 bg-gray-300 animate-pulse'></div>

            <div className='mt-6 flex items-center justify-start gap-5'>
              <div className='h-4 w-28 bg-gray-300 animate-pulse'></div>
              <div className='h-5 w-5 rounded-full bg-gray-300'></div>
            </div>
          </div>

          <div className='mt- h-9 rounded-md bg-gray-300'></div>
        </li>

        <li className='bg-white rounded-md h-[600px] p-2 flex flex-col justify-between'>
          <div>
            <div className='h-40 bg-gray-300 rounded-md animate-pulse'></div>
            <div className='mt-4 h-7 w-44 bg-gray-300 animate-pulse'></div>
            <div className='mt-2 h-5 bg-gray-300 animate-pulse'></div>

            <div className='mt-6 h-5 w-52 bg-gray-300 animate-pulse'></div>
            <div className='mt-2 h-5 w-36 bg-gray-300 animate-pulse'></div>

            <div className='mt-6 flex items-center justify-start gap-5'>
              <div className='h-4 w-28 bg-gray-300 animate-pulse'></div>
              <div className='h-5 w-5 rounded-full bg-gray-300'></div>
            </div>
          </div>

          <div className='mt- h-9 rounded-md bg-gray-300'></div>
        </li>

        <li className='bg-white rounded-md h-[600px] p-2 flex flex-col justify-between'>
          <div>
            <div className='h-40 bg-gray-300 rounded-md animate-pulse'></div>
            <div className='mt-4 h-7 w-44 bg-gray-300 animate-pulse'></div>
            <div className='mt-2 h-5 bg-gray-300 animate-pulse'></div>

            <div className='mt-6 h-5 w-52 bg-gray-300 animate-pulse'></div>
            <div className='mt-2 h-5 w-36 bg-gray-300 animate-pulse'></div>

            <div className='mt-6 flex items-center justify-start gap-5'>
              <div className='h-4 w-28 bg-gray-300 animate-pulse'></div>
              <div className='h-5 w-5 rounded-full bg-gray-300'></div>
            </div>
          </div>

          <div className='mt- h-9 rounded-md bg-gray-300'></div>
        </li>
      </ul>
    </Container>
  );
}
