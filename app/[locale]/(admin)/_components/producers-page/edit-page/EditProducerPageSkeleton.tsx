import Container from '@/components/shared/Container';

export default function EditProducerPageSkeleton() {
  return (
    <Container>
      <div className='bg-gray-300 rounded-md animate-pulse w-36 h-10'></div>
      <div className='bg-gray-300 rounded-md animate-pulse max-w-[380px] h-8 mt-5'></div>

      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className='bg-gray-200 rounded-md p-4'>
          <div className='bg-gray-300 animate-pulse max-w-[230px] h-6'></div>
          <div className='mt-8 flex gap-2'>
            <div className='flex flex-col gap-2 basis-1/2'>
              <div className='bg-gray-300 w-20 h-2'></div>
              <div className='bg-gray-300 animate-pulse h-6 rounded-md'></div>
            </div>
          </div>
        </div>

        <div className='bg-gray-200 rounded-md p-4'>
          <div className='bg-gray-300 animate-pulse max-w-[230px] h-6'></div>
          <div className='mt-8 flex gap-2'>
            <div className='flex flex-col gap-2 basis-1/2'>
              <div className='bg-gray-300 w-20 h-2'></div>
              <div className='bg-gray-300 animate-pulse h-6 rounded-md'></div>
            </div>
          </div>
        </div>

        <div className='bg-gray-200 rounded-md p-4 col-span-full min-h-[104px]'>
          <div className='flex items-center gap-2 h-full'>
            <div className='flex flex-col gap-2 basis-1/2'>
              <div className='bg-gray-300 w-20 h-2'></div>
              <div className='bg-gray-300 animate-pulse h-6 rounded-md'></div>
            </div>

            <div className='flex flex-col gap-2 basis-1/2'>
              <div className='bg-gray-300 w-20 h-2'></div>
              <div className='bg-gray-300 animate-pulse h-6 rounded-md'></div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
