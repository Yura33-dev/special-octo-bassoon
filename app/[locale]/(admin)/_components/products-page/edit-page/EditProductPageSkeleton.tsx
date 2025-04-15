import Container from '@/components/shared/Container';

export default function EditProductPageSkeleton() {
  return (
    <Container>
      <div className='bg-gray-300 rounded-md animate-pulse w-36 h-10'></div>
      <div className='bg-gray-300 rounded-md animate-pulse max-w-[380px] h-8 mt-5'></div>

      <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5'>
        <div className='bg-gray-200 rounded-md p-4'>
          <div className='bg-gray-300 animate-pulse max-w-[230px] h-6'></div>
          <div className='mt-8 flex gap-2'>
            <div className='flex flex-col gap-2 basis-full'>
              <div className='bg-gray-300 w-20 h-2'></div>
              <div className='bg-gray-300 animate-pulse h-6 rounded-md'></div>
            </div>

            <div className='flex flex-col gap-2 basis-full'>
              <div className='bg-gray-300 w-20 h-2'></div>
              <div className='bg-gray-300 animate-pulse h-6 rounded-md'></div>
            </div>
          </div>

          <div className='mt-10 border-[1px] border-gray-400 h-[400px]'>
            <div className='flex justify-start items-center gap-4 border-b-[1px] border-gray-400 p-3'>
              <div className='w-16 h-5 bg-gray-300'></div>
              <div className='w-8 h-5 bg-gray-300'></div>
              <div className='w-5 h-5 bg-gray-300'></div>
              <div className='w-8 h-5 bg-gray-300'></div>
              <div className='w-10 h-5 bg-gray-300'></div>
              <div className='w-8 h-5 bg-gray-300'></div>
              <div className='w-4 h-5 bg-gray-300'></div>
            </div>
          </div>

          <div className='mt-10 flex flex-col gap-2 w-1/2'>
            <div className='bg-gray-300 w-20 h-2'></div>
            <div className='bg-gray-300 animate-pulse h-6 rounded-md'></div>
          </div>
        </div>

        <div className='bg-gray-200 rounded-md p-4'>
          <div className='bg-gray-300 animate-pulse max-w-[230px] h-6'></div>
          <div className='mt-8 flex gap-2'>
            <div className='flex flex-col gap-2 basis-full'>
              <div className='bg-gray-300 w-20 h-2'></div>
              <div className='bg-gray-300 animate-pulse h-6 rounded-md'></div>
            </div>

            <div className='flex flex-col gap-2 basis-full'>
              <div className='bg-gray-300 w-20 h-2'></div>
              <div className='bg-gray-300 animate-pulse h-6 rounded-md'></div>
            </div>
          </div>

          <div className='mt-10 border-[1px] border-gray-400 h-[400px]'>
            <div className='flex justify-start items-center gap-4 border-b-[1px] border-gray-400 p-3'>
              <div className='w-16 h-5 bg-gray-300'></div>
              <div className='w-8 h-5 bg-gray-300'></div>
              <div className='w-5 h-5 bg-gray-300'></div>
              <div className='w-8 h-5 bg-gray-300'></div>
              <div className='w-10 h-5 bg-gray-300'></div>
              <div className='w-8 h-5 bg-gray-300'></div>
              <div className='w-4 h-5 bg-gray-300'></div>
            </div>
          </div>

          <div className='mt-10 flex flex-col gap-2 w-1/2'>
            <div className='bg-gray-300 w-20 h-2'></div>
            <div className='bg-gray-300 animate-pulse h-6 rounded-md'></div>
          </div>
        </div>
      </div>
    </Container>
  );
}
