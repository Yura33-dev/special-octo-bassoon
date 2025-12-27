import clsx from 'clsx';
import { useTranslations } from 'next-intl';

interface ICardLabelProps {
  labels: string[];
}

export default function CardLabel({ labels }: ICardLabelProps) {
  const t = useTranslations('ProductCard');
  const translatedLabels = labels.map(label => t(label));

  return (
    <div className='absolute top-4  right-4 flex flex-col gap-y-3'>
      {translatedLabels.map((label, index) => (
        <span
          key={index}
          className={clsx(
            `badge h-auto w-auto px-2 py-1 rounded-md bg-accent border-none text-white font-semibold
              transition-colors duration-150 tracking-wide text-sm`,
            label === 'Розпродаж' && 'bg-red-600'
          )}
        >
          {label}
        </span>
      ))}
    </div>
  );
}
