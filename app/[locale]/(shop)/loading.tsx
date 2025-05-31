import CircleLoader from '@/components/shared/loaders/CircleLoader';

export default function Loading() {
  return (
    <div className='h-[250px] flex justify-center items-center'>
      <CircleLoader className='w-14 h-14' />
    </div>
  );
}
