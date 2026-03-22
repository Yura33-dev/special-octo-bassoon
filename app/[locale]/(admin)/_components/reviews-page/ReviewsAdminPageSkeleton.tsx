import Container from '@/components/shared/Container';

export default function ReviewsAdminPageSkeleton() {
  return (
    <Container>
      <div className='bg-gray-400 rounded-sm w-40 h-7 animate-pulse mb-6' />

      <div className='flex gap-2 mb-6'>
        <div className='bg-gray-300 rounded-md w-20 h-8 animate-pulse' />
        <div className='bg-gray-300 rounded-md w-24 h-8 animate-pulse' />
      </div>

      <div className='flex flex-col gap-4'>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className='bg-gray-300/50 rounded-md p-4 flex flex-col gap-3 animate-pulse'
          >
            <div className='flex justify-between'>
              <div className='flex flex-col gap-1'>
                <div className='bg-gray-400 rounded-sm w-36 h-4' />
              </div>
              <div className='bg-gray-300 rounded-full w-20 h-6' />
            </div>

            <div className='bg-gray-300 rounded-sm w-52 h-3' />

            <div className='flex gap-1'>
              {[...Array(5)].map((_, j) => (
                <div key={j} className='bg-gray-400 rounded-sm w-5 h-5' />
              ))}
            </div>

            <div className='bg-gray-300 rounded-sm w-full h-4' />
            <div className='bg-gray-300 rounded-sm w-3/4 h-4' />

            <div className='flex gap-2 pt-2'>
              <div className='bg-gray-400 rounded-md w-28 h-8' />
              <div className='bg-gray-400 rounded-md w-8 h-8' />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
