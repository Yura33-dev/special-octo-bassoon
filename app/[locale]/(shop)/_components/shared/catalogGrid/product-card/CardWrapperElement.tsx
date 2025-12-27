import { ReactNode } from 'react';

interface ICardWrapperElementProps {
  element?: 'li' | 'div';
  children: ReactNode;
}

export default function CardWrapperElement({
  element = 'li',
  children,
}: ICardWrapperElementProps) {
  const className =
    'bg-white rounded-t-md rounded-b-md group lg:hover:rounded-b-none w-full h-full flex flex-col max-w-[350px] sm:max-w-none lg:max-w-[280px]';

  return (
    <>
      {element === 'div' ? (
        <div className={className}>{children}</div>
      ) : (
        <li className={className}>{children}</li>
      )}
    </>
  );
}
