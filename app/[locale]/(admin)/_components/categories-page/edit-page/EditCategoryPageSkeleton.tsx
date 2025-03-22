import Container from '@/components/shared/Container';

export default function EditCategoryPageSkeleton() {
  return (
    <Container>
      <div className='w-40 h-7 bg-gray-300 animate-pulse rounded-md mb-5'></div>
      <div className='w-72 h-8 bg-gray-400 animate-pulse mb-8'></div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className='flex flex-col gap-4 p-4 bg-gray-200 rounded-md'>
          <div className='w-48 h-5 bg-gray-400 animate-pulse mb-12'></div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2'>
            <div className='h-7 bg-gray-300 animate-pulse rounded-md'>
              <div className='hidden sm:block h-3 bg-gray-400 w-1/2 -translate-y-5'></div>
            </div>
            <div className='h-7 bg-gray-300 animate-pulse rounded-md'>
              <div className='hidden sm:block h-3 bg-gray-400 w-1/2 -translate-y-5'></div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4 p-4 bg-gray-200 rounded-md'>
          <div className='w-48 h-5 bg-gray-400 animate-pulse mb-12'></div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2'>
            <div className='h-7 bg-gray-300 animate-pulse rounded-md'>
              <div className='hidden sm:block h-3 bg-gray-400 w-1/2 -translate-y-5'></div>
            </div>
            <div className='h-7 bg-gray-300 animate-pulse rounded-md'>
              <div className='hidden sm:block h-3 bg-gray-400 w-1/2 -translate-y-5'></div>
            </div>
          </div>
        </div>

        <div className='col-span-full flex flex-col gap-8 p-4 bg-gray-200 rounded-md'>
          <div className='flex flex-col md:flex-row gap-6 lg:gap-10'>
            <div className='flex flex-col gap-2'>
              <div className='w-24 h-2 bg-gray-400 animate-pulse'></div>
              <div className='w-28 h-6 bg-gray-300 animate-pulse rounded-md'></div>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='w-48 h-2 bg-gray-400 animate-pulse'></div>
              <div className='w-16 h-6 bg-gray-300 animate-pulse rounded-md'></div>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='w-14 h-2 bg-gray-400 animate-pulse'></div>
              <div className='w-24 h-6 bg-gray-300 animate-pulse rounded-md'></div>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <div className='w-24 h-2 bg-gray-400 animate-pulse'></div>
            <div className='w-36 h-36 bg-gray-300 animate-pulse rounded-md'></div>
          </div>
        </div>
      </div>
    </Container>
  );
}
