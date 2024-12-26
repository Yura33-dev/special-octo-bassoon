import clsx from 'clsx';
import React from 'react';

interface ISkeletonProps {
  quantity: number;
  className?: string;
  icon?: React.ReactNode;
  wrapperStyle?: string;
  widths?: Array<string>;
}

export default function Skeleton({
  quantity,
  className,
  icon: Icon,
  wrapperStyle,
  widths,
}: ISkeletonProps) {
  return (
    <ul className={clsx(wrapperStyle && wrapperStyle)}>
      {Array(quantity)
        .fill(0)
        .map((_, index) => (
          <li
            key={index}
            className={clsx(Icon && 'flex justify-between items-center')}
          >
            <span
              className={clsx(
                `block bg-gray-300 rounded animate-pulse`,
                widths && widths?.length > 0 && widths[index],
                className && className
              )}
            ></span>
            {Icon && Icon}
          </li>
        ))}
    </ul>
  );
}
