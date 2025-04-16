import { useLocale, useTranslations } from 'next-intl';

import { formattedPackValue, formattedPrice } from '@/lib/utils';
import { IProductPackItemMapped } from '@/types';

interface ICardPriceProps {
  availablePackaging: Array<IProductPackItemMapped>;
  activePackaging: string;
}

export default function CardInfo({
  availablePackaging,
  activePackaging,
}: ICardPriceProps) {
  const packaging =
    availablePackaging.find(pack => pack.packId.id === activePackaging) ??
    availablePackaging[0];

  const locale = useLocale();
  const t = useTranslations('ProductCard');

  return (
    <>
      <p className='font-bold text-center text-lg sm:text-xl mb-2'>
        {formattedPrice(packaging.price)}
      </p>

      <span className='badge border-none bg-primary text-white text-xs mb-3 block mx-auto leading-relaxed'>
        {formattedPackValue(
          packaging.packId.translatedData[locale].type,
          packaging.packId.translatedData[locale].measureValue,
          packaging.packId.translatedData[locale].measureIn
        )}
      </span>

      <p className='text-center text-xs sm:text-sm mb-3'>{t('bulk')}</p>
    </>
  );
}
