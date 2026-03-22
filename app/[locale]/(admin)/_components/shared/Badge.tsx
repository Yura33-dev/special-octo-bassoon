import clsx from 'clsx';

interface IBadgeProps {
  title: string;
  style: 'green' | 'yellow';
}

export default function Badge({ title, style }: IBadgeProps) {
  return (
    <div className='flex items-center gap-2'>
      <span
        className={clsx(
          'text-xs px-2 py-1 rounded-full font-medium',
          style === 'green'
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
        )}
      >
        {title}
      </span>
    </div>
  );
}
