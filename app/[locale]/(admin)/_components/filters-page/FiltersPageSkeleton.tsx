import Container from '@/components/shared/Container';

export default function FiltersPageSkeleton() {
  return (
    <Container>
      <div className='flex justify-between items-center'>
        <div className='w-52 h-8 bg-gray-300 animate-pulse'></div>
        <div className='w-24 h-9 bg-gray-300 animate-pulse rounded-md'></div>
      </div>
      <ul className='mt-10 flex flex-col gap-4'>
        <li className='bg-gray-300 rounded-md p-4'>
          <div className='flex justify-between items-center gap-5'>
            <div className='bg-gray-400 w-32 h-4 animate-pulse'></div>
            <div className='bg-gray-400 w-32 h-9 animate-pulse rounded-md'></div>
          </div>

          <div className='pl-4  mt-4 flex flex-col gap-3'>
            <div className='w-16 h-3 bg-gray-400 animate-pulse'></div>

            <div className='flex justify-start items-center gap-2 flex-wrap'>
              <div className='w-24 h-9 bg-gray-400 animate-pulse rounded-md'></div>
              <div className='w-32 h-9 bg-gray-400 animate-pulse rounded-md'></div>
              <div className='w-16 h-9 bg-gray-400 animate-pulse rounded-md'></div>
              <div className='w-24 h-9 bg-gray-400 animate-pulse rounded-md'></div>
            </div>
          </div>
        </li>
        <li className='bg-gray-300 rounded-md p-4'>
          <div className='flex justify-between items-center gap-5'>
            <div className='bg-gray-400 w-32 h-4 animate-pulse'></div>
            <div className='bg-gray-400 w-32 h-9 animate-pulse rounded-md'></div>
          </div>

          <div className='pl-4  mt-4 flex flex-col gap-3'>
            <div className='w-16 h-3 bg-gray-400 animate-pulse'></div>

            <div className='flex justify-start items-center gap-2 flex-wrap'>
              <div className='w-28 h-9 bg-gray-400 animate-pulse rounded-md'></div>
              <div className='w-24 h-9 bg-gray-400 animate-pulse rounded-md'></div>
              <div className='w-16 h-9 bg-gray-400 animate-pulse rounded-md'></div>
            </div>
          </div>
        </li>
        <li className='bg-gray-300 rounded-md p-4'>
          <div className='flex justify-between items-center gap-5'>
            <div className='bg-gray-400 w-32 h-4 animate-pulse'></div>
            <div className='bg-gray-400 w-32 h-9 animate-pulse rounded-md'></div>
          </div>

          <div className='pl-4  mt-4 flex flex-col gap-3'>
            <div className='w-16 h-3 bg-gray-400 animate-pulse'></div>

            <div className='flex justify-start items-center gap-2 flex-wrap'>
              <div className='w-28 h-9 bg-gray-400 animate-pulse rounded-md'></div>
              <div className='w-24 h-9 bg-gray-400 animate-pulse rounded-md'></div>
              <div className='w-16 h-9 bg-gray-400 animate-pulse rounded-md'></div>
              <div className='w-28 h-9 bg-gray-400 animate-pulse rounded-md'></div>
              <div className='w-28 h-9 bg-gray-400 animate-pulse rounded-md'></div>
              <div className='w-28 h-9 bg-gray-400 animate-pulse rounded-md'></div>
            </div>
          </div>
        </li>
      </ul>
    </Container>
  );
}
