import clsx from 'clsx';

interface ICircleLoaderProps {
  className?: string;
}

export default function CircleLoader({ className }: ICircleLoaderProps) {
  return (
    <div
      className={clsx(
        `h-10 w-10 animate-spin rounded-full border-[5px] border-solid border-accent border-t-transparent`,
        className && className
      )}
    ></div>
  );
}
