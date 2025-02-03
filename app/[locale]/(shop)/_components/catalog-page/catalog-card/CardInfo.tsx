import { useTranslations } from 'next-intl';

import { formattedPackValue, formattedPrice } from '@/lib/utils';
import { IProductPack } from '@/types';

interface ICardPriceProps {
  availablePackaging: Array<IProductPack>;
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

  return (
    <>
      <p className='font-bold text-center text-lg sm:text-xl mb-2'>
        {formattedPrice(packaging.price)}
      </p>

      <span className='badge border-none bg-primary text-white text-xs mb-3 block mx-auto leading-relaxed'>
        {formattedPackValue(
          packaging.type,
          packaging.measureValue,
          packaging.measureIn
        )}
      </span>

      <p className='text-center text-xs sm:text-sm mb-3'>{t('bulk')}</p>
    </>
  );
}
