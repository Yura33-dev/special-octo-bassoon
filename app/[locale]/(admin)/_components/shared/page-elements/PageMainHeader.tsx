import clsx from 'clsx';

interface IPageHeaderProps {
  title: string;
  length?: number;
  className?: string;
  htmlTitle?: boolean;
}

export default function PageMainHeader({
  title,
  length,
  className,
  htmlTitle = false,
}: IPageHeaderProps) {
  if (htmlTitle) {
    return (
      <h1
        dangerouslySetInnerHTML={{ __html: title }}
        className={clsx('text-2xl', className && className)}
      ></h1>
    );
  }

  return (
    <h1 className={clsx('text-2xl font-semibold', className && className)}>
      {title} {length && length > 0 ? `(${length})` : null}
    </h1>
  );
}
