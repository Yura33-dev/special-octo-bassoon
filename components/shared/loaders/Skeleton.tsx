// interface ISkeletonProps {
//   className?: string;
// }

import { ChevronRight } from 'lucide-react';

export default function Skeleton() {
  return (
    <div className='flex flex-col space-y-5 p-5'>
      <div className='flex justify-between items-center'>
        <span className='inline-block h-5 w-1/2 bg-gray-300 rounded animate-pulse'></span>
        <ChevronRight size={16} className='animate-pulse' />
      </div>
      <div className='flex justify-between items-center'>
        <span className='inline-block h-5 w-2/3 bg-gray-300 rounded animate-pulse'></span>
        <ChevronRight size={16} className='animate-pulse' />
      </div>
      <div className='flex justify-between items-center'>
        <span className='inline-block h-5 w-1/3 bg-gray-300 rounded animate-pulse'></span>
        <ChevronRight size={16} className='animate-pulse' />
      </div>
      <div className='flex justify-between items-center'>
        <span className='inline-block h-5 w-1/2 bg-gray-300 rounded animate-pulse'></span>
        <ChevronRight size={16} className='animate-pulse' />
      </div>
      <div className='flex justify-between items-center'>
        <span className='inline-block h-5 w-10/12 bg-gray-300 rounded animate-pulse'></span>
        <ChevronRight size={16} className='animate-pulse' />
      </div>
    </div>
  );
}
