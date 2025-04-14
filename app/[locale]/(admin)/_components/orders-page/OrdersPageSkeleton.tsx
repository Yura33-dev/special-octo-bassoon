import Container from '@/components/shared/Container';

export default function OrdersPageSkeleton() {
  return (
    <Container>
      <div className='flex flex-col gap-2 mt-2'>
        <div className='bg-gray-300/50 rounded-md h-[60px] animate-pulse px-4 flex justify-between items-center'>
          <div className='bg-gray-400 rounded-sm w-52 h-[20px] animate-pulse'></div>
          <div className='flex gap-2 justify-center items-center'>
            <div className='bg-gray-400 rounded-sm w-32 h-[15px] animate-pulse'></div>
            <div className='bg-gray-400 rounded-full w-5 h-5 animate-pulse'></div>
          </div>
        </div>

        <div className='bg-gray-300/50 rounded-md h-[60px] animate-pulse px-4 flex justify-between items-center'>
          <div className='bg-gray-400 rounded-sm w-52 h-[20px] animate-pulse'></div>
          <div className='flex gap-2 justify-center items-center'>
            <div className='bg-gray-400 rounded-sm w-32 h-[15px] animate-pulse'></div>
            <div className='bg-gray-400 rounded-full w-5 h-5 animate-pulse'></div>
          </div>
        </div>

        <div className='bg-gray-300/50 rounded-md h-[60px] animate-pulse px-4 flex justify-between items-center'>
          <div className='bg-gray-400 rounded-sm w-52 h-[20px] animate-pulse'></div>
          <div className='flex gap-2 justify-center items-center'>
            <div className='bg-gray-400 rounded-sm w-32 h-[15px] animate-pulse'></div>
            <div className='bg-gray-400 rounded-full w-5 h-5 animate-pulse'></div>
          </div>
        </div>
      </div>
    </Container>
  );
}
