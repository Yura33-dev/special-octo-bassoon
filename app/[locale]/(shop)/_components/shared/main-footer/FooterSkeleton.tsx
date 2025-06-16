import Container from '@/components/shared/Container';

export default function FooterSkeleton() {
  return (
    <footer className='mt-20 bg-primary text-white py-8'>
      <Container>
        <div className='flex flex-col items-center mb-6 lg:mb-12'>
          <div className='bg-gray-400 h-8 w-36 mb-4 animate-pulse'></div>
          <div className='bg-gray-400 h-4 w-64'></div>
        </div>

        <div className='flex flex-col gap-8 sm:gap-0 sm:gap-x-4 sm:gap-y-6 sm:flex-row sm:flex-wrap sm:justify-between'>
          <ul className='flex flex-col items-center sm:items-start gap-4 basis-[calc((100%_-_32px)_/_3)]'>
            <li className='bg-gray-400 h-4 w-1/3 animate-pulse'></li>
            <li className='bg-gray-400 h-4 w-2/3 animate-pulse'></li>
            <li className='bg-gray-400 h-4 w-1/2 animate-pulse'></li>
            <li className='bg-gray-400 h-4 w-1/3 animate-pulse'></li>
            <li className='bg-gray-400 h-4 w-1/2 animate-pulse'></li>
          </ul>

          <ul className='flex flex-col items-center sm:items-start gap-4 basis-[calc((100%_-_32px)_/_3)]'>
            <li className='bg-gray-400 h-4 w-1/3 animate-pulse'></li>
            <li className='bg-gray-400 h-4 w-2/3 animate-pulse'></li>
            <li className='bg-gray-400 h-4 w-1/2 animate-pulse'></li>
            <li className='bg-gray-400 h-4 w-1/3 animate-pulse'></li>
            <li className='bg-gray-400 h-4 w-1/2 animate-pulse'></li>
          </ul>

          <ul className='flex flex-col items-center sm:items-start gap-4 basis-[calc((100%_-_32px)_/_3)]'>
            <li className='bg-gray-400 h-4 w-1/3 animate-pulse'></li>
            <li className='bg-gray-400 h-4 w-2/3 animate-pulse'></li>
            <li className='bg-gray-400 h-4 w-1/2 animate-pulse'></li>
            <li className='bg-gray-400 h-4 w-1/3 animate-pulse'></li>
            <li className='bg-gray-400 h-4 w-1/2 animate-pulse'></li>
          </ul>
        </div>

        <div className='bg-gray-400 h-3 max-w-[250px] animate-pulse mx-auto mt-16'></div>
      </Container>
    </footer>
  );
}
