import clsx from 'clsx';

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={clsx('px-4 mx-auto max-w-7xl', className && className)}>
      {children}
    </div>
  );
};

export default Container;
