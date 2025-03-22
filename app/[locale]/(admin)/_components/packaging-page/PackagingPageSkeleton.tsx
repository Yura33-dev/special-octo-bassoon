import Container from '@/components/shared/Container';

export default function PackagingPageSkeleton() {
  return (
    <Container>
      <ul className='flex justify-between'>
        <li className='w-72 h-8 bg-gray-300 animate-pulse'></li>
        <li className='w-24 h-9 bg-gray-300 animate-pulse rounded-md'></li>
      </ul>

      <ul className='mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2'>
        <li className='p-4 bg-gray-300/30 text-foreground rounded-md'>
          <div className='flex justify-between items-center'>
            <div className='w-28 h-4 bg-gray-300 animate-pulse'></div>
            <div className='w-28 h-9 bg-gray-300 animate-pulse rounded-md'></div>
          </div>
        </li>

        <li className='p-4 bg-gray-300/30 text-foreground rounded-md'>
          <div className='flex justify-between items-center'>
            <div className='w-28 h-4 bg-gray-300 animate-pulse'></div>
            <div className='w-28 h-9 bg-gray-300 animate-pulse rounded-md'></div>
          </div>
        </li>

        <li className='p-4 bg-gray-300/30 text-foreground rounded-md'>
          <div className='flex justify-between items-center'>
            <div className='w-28 h-4 bg-gray-300 animate-pulse'></div>
            <div className='w-28 h-9 bg-gray-300 animate-pulse rounded-md'></div>
          </div>
        </li>

        <li className='p-4 bg-gray-300/30 text-foreground rounded-md'>
          <div className='flex justify-between items-center'>
            <div className='w-28 h-4 bg-gray-300 animate-pulse'></div>
            <div className='w-28 h-9 bg-gray-300 animate-pulse rounded-md'></div>
          </div>
        </li>

        <li className='p-4 bg-gray-300/30 text-foreground rounded-md'>
          <div className='flex justify-between items-center'>
            <div className='w-28 h-4 bg-gray-300 animate-pulse'></div>
            <div className='w-28 h-9 bg-gray-300 animate-pulse rounded-md'></div>
          </div>
        </li>

        <li className='p-4 bg-gray-300/30 text-foreground rounded-md'>
          <div className='flex justify-between items-center'>
            <div className='w-28 h-4 bg-gray-300 animate-pulse'></div>
            <div className='w-28 h-9 bg-gray-300 animate-pulse rounded-md'></div>
          </div>
        </li>

        <li className='p-4 bg-gray-300/30 text-foreground rounded-md'>
          <div className='flex justify-between items-center'>
            <div className='w-28 h-4 bg-gray-300 animate-pulse'></div>
            <div className='w-28 h-9 bg-gray-300 animate-pulse rounded-md'></div>
          </div>
        </li>
      </ul>
    </Container>
  );
}
