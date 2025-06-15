import Container from '@/components/shared/Container';

export default function BannersPageSkeleton() {
  return (
    <Container>
      <div className='bg-gray-200 rounded-md p-4 grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div>
          <div className='w-44 h-6 my-6 bg-gray-400'></div>
          <div className='p-4 rounded-md bg-gray-300 h-[300px] animate-pulse'></div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='mt-4 bg-gray-400 h-5 animate-pulse rounded-md'></div>
            <div className='mt-4 bg-gray-400 h-5 animate-pulse rounded-md'></div>
            <div className='mt-4 bg-gray-400 h-7 max-w-24 animate-pulse rounded-md'></div>
            <div className='mt-4 bg-gray-400 h-5 animate-pulse rounded-md'></div>
          </div>
          <div className='mt-8 bg-gray-400 w-36 h-36 animate-pulse rounded-md'></div>
        </div>

        <div>
          <div className='w-44 h-6 my-6 bg-gray-400'></div>
          <div className='p-4 rounded-md bg-gray-300 h-[300px] animate-pulse'></div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='mt-4 bg-gray-400 h-5 animate-pulse rounded-md'></div>
            <div className='mt-4 bg-gray-400 h-5 animate-pulse rounded-md'></div>
            <div className='mt-4 bg-gray-400 h-7 max-w-24 animate-pulse rounded-md'></div>
            <div className='mt-4 bg-gray-400 h-5 animate-pulse rounded-md'></div>
          </div>
          <div className='mt-8 bg-gray-400 w-36 h-36 animate-pulse rounded-md'></div>
        </div>
      </div>
    </Container>
  );
}
