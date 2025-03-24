import Container from '@/components/shared/Container';

export default function EditFilterPageSkeleton() {
  return (
    <Container>
      <div className='flex flex-col gap-7 mb-8'>
        <div className='w-32 h-6 bg-gray-300 animate-pulse'></div>
        <div className='w-52 h-9 bg-gray-300 animate-pulse'></div>
      </div>

      <div className='mt-5 flex flex-col gap-5'>
        <div className='flex gap-5'>
          <div className='bg-gray-300 basis-1/2 rounded-md p-4'>
            <div className='flex flex-col gap-4'>
              <div className='w-48 h-6 mb-5 bg-gray-400 animate-pulse'></div>
              <div className='h-8 bg-gray-400 animate-pulse rounded-md'></div>
            </div>
          </div>
          <div className='bg-gray-300 basis-1/2 rounded-md p-4'>
            <div className='flex flex-col gap-4'>
              <div className='w-48 h-6 mb-5 bg-gray-400 animate-pulse'></div>
              <div className='h-8 bg-gray-400 animate-pulse rounded-md'></div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
