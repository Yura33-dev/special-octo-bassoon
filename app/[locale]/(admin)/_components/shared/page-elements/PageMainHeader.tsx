import clsx from 'clsx';

interface IPageHeaderProps {
  title: string;
  length?: number;
  className?: string;
}

export default function PageMainHeader({
  title,
  length,
  className,
}: IPageHeaderProps) {
  return (
    <h1 className={clsx('text-2xl font-semibold', className && className)}>
      {title} {length && `(${length})`}
    </h1>
  );
}
