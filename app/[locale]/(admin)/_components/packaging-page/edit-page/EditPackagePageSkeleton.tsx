import Container from '@/components/shared/Container';

export default function EditPackagePageSkeleton() {
  return (
    <Container>
      <div className='w-40 h-7 bg-gray-300 animate-pulse rounded-md mb-5'></div>
      <div className='w-64 h-8 bg-gray-400 animate-pulse mb-8'></div>

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

        <div className='flex flex-col gap-4 p-4 bg-gray-200 rounded-md'>
          <div className='w-48 h-3 bg-gray-400 animate-pulse'></div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2'>
            <div className='max-w-1/2 h-6 bg-gray-300 animate-pulse rounded-md'></div>
          </div>
        </div>

        <div className='flex flex-col gap-4 p-4 bg-gray-200 rounded-md'>
          <div className='w-48 h-3 bg-gray-400 animate-pulse'></div>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-2'>
            <div className='max-w-1/2 h-6 bg-gray-300 animate-pulse rounded-md'></div>
          </div>
        </div>
      </div>
    </Container>
  );
}
