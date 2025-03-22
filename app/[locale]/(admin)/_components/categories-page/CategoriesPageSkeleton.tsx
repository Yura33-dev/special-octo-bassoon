// interface ITableSkeletonProps {}

import Container from '@/components/shared/Container';

export default function CategoriesPageSkeleton() {
  return (
    <Container className='mt-10'>
      <div className='mb-5 flex justify-between'>
        <div className='bg-gray-300/50 h-[36px] w-[230px] animate-pulse'></div>
        <div className='bg-gray-300/50 h-[36px] w-[95px] animate-pulse rounded-md'></div>
      </div>

      <div className='bg-gray-300/50 h-[41px] border-b-gray-400 border-[1px] animate-pulse mb-4'></div>
      <div className='flex flex-col gap-4'>
        <div className='bg-gray-300/50 h-[96px] p-4 flex items-center gap-6 justify-around rounded-md'>
          <div className='bg-gray-300 animate-pulse w-16 h-16 rounded-md flex-shrink-0 flex-grow-0 basis-[64px]'></div>
          <div className='bg-gray-300 animate-pulse w-[200px] h-[24px]'></div>
          <div className='bg-gray-300 animate-pulse w-6 h-6 rounded-full'></div>
          <div className='bg-gray-300 animate-pulse w-6 h-6'></div>
          <div className='bg-gray-300 animate-pulse w-12 h-4'></div>
        </div>

        <div className='bg-gray-300/50 h-[96px] p-4 flex items-center gap-6 justify-around rounded-md'>
          <div className='bg-gray-300 animate-pulse w-16 h-16 rounded-md flex-shrink-0 flex-grow-0 basis-[64px]'></div>
          <div className='bg-gray-300 animate-pulse w-[200px] h-[24px]'></div>
          <div className='bg-gray-300 animate-pulse w-6 h-6 rounded-full'></div>
          <div className='bg-gray-300 animate-pulse w-6 h-6'></div>
          <div className='bg-gray-300 animate-pulse w-12 h-4'></div>
        </div>

        <div className='bg-gray-300/50 h-[96px] p-4 flex items-center gap-6 justify-around rounded-md'>
          <div className='bg-gray-300 animate-pulse w-16 h-16 rounded-md flex-shrink-0 flex-grow-0 basis-[64px]'></div>
          <div className='bg-gray-300 animate-pulse w-[200px] h-[24px]'></div>
          <div className='bg-gray-300 animate-pulse w-6 h-6 rounded-full'></div>
          <div className='bg-gray-300 animate-pulse w-6 h-6'></div>
          <div className='bg-gray-300 animate-pulse w-12 h-4'></div>
        </div>
      </div>
    </Container>
  );
}
