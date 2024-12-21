// interface ICircleLoaderProps {}

export default function CircleLoader() {
  return (
    <div className='flex items-center justify-center'>
      <div className='h-10 w-10 animate-spin rounded-full border-[5px] border-solid border-accent border-t-transparent'></div>
    </div>
  );
}
