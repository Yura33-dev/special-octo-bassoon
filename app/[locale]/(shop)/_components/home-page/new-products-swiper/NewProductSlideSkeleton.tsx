import clsx from 'clsx';

export default function NewProductSlideSkeletons() {
  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <li
            key={index}
            className={clsx(
              'bg-gray-300 rounded-md',
              index === 1 && 'hidden sm:block',
              index === 2 && 'hidden lg:block',
              index === 3 && 'hidden xl:block'
            )}
          >
            <div className='h-[200px] bg-gray-400 rounded-md animate-pulse'></div>

            <div className='mt-5 h-5 w-48 bg-gray-400 mx-auto'></div>

            <div className='mt-5 h-5 w-24 bg-gray-400 mx-auto'></div>

            <div className='mt-3 h-4 w-28 bg-gray-400 mx-auto rounded-md'></div>

            <div className='mt-5 w-[90%] h-12 bg-gray-400 mx-auto rounded-md animate-pulse'></div>

            <div className='my-4 mr-4 flex justify-end items-center gap-2 flex-wrap'>
              <div className='h-4 w-28 bg-gray-400 rounded-md'></div>
              <div className='h-4 w-16 bg-gray-400 rounded-md'></div>
            </div>
          </li>
        ))}
    </ul>
  );
}
