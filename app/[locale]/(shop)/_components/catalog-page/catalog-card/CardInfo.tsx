import { useTranslations } from 'next-intl';

import { formattedPrice } from '@/lib/utils';
import { IPackaging } from '@/types';

interface ICardPriceProps {
  availablePackaging: Array<IPackaging>;
  activePackaging: string;
}

export default function CardInfo({
  availablePackaging,
  activePackaging,
}: ICardPriceProps) {
  const packaging =
    availablePackaging.find(pack => pack.id === activePackaging) ??
    availablePackaging[0];

  const t = useTranslations('ProductCard');
  const packagingString = `${t(packaging.type)} ${packaging.measurements.measureValue} ${t(packaging.measurements.measureIn)}`;

  return (
    <>
      <p className='font-bold text-center text-lg sm:text-xl mb-2'>
        {formattedPrice(packaging.price)}
      </p>

      <span className='badge border-none bg-primary text-white text-xs mb-3 block mx-auto leading-relaxed'>
        {packagingString}
      </span>

      <p className='text-center text-xs sm:text-sm mb-3'>{t('bulk')}</p>
    </>
  );
}
