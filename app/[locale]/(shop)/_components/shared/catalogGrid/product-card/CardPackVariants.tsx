import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { formattedPackValue, formattedPrice } from '@/lib/utils';
import { IProducerMapped, IProductPackItemMapped } from '@/types';

interface ICardPackVariantsProps {
  producer: IProducerMapped;
  availablePackaging: Array<IProductPackItemMapped>;
  activePackaging: string;
  productLink: string;
  handleChangeActivePackaging: (packId: string) => void;
}

export default function CardPackVariants({
  producer,
  availablePackaging,
  activePackaging,
  handleChangeActivePackaging,
  productLink,
}: ICardPackVariantsProps) {
  const locale = useLocale();
  const t = useTranslations('ProductCard');

  const packagingInStock = availablePackaging.filter(
    packVariant => packVariant.quantity > 0 || packVariant.quantity === null
  );

  const visiblePackaging =
    packagingInStock.length > 3
      ? packagingInStock.slice(0, 3)
      : packagingInStock;

  const activePack =
    visiblePackaging.find(pack => pack.packId.id === activePackaging) ??
    visiblePackaging[0];

  return (
    <div
      className='p-4 pt-0 opacity-0 invisible transition-all rounded-b-md w-full bg-white
                  lg:group-hover:opacity-100 lg:group-hover:visible 
                  absolute top-full left-0 z-[1]'
    >
      <h4 className='mb-1 font-semibold'>{t('packagingTitle')}</h4>
      <ul className='text-sm flex flex-col gap-1'>
        {visiblePackaging.length > 0 &&
          visiblePackaging.map(packageVariant => (
            <li key={packageVariant.packId.id}>
              <button
                type='button'
                className={clsx(
                  `w-full flex text-left text-xs gap-2 border-[1px] rounded-md px-2 py-1 transition-colors`,
                  activePack.packId.id === packageVariant.packId.id
                    ? 'border-accent'
                    : 'border-gray-200'
                )}
                onClick={() =>
                  handleChangeActivePackaging(packageVariant.packId.id)
                }
              >
                <span className='basis-2/3 max-w-2/3 truncate'>
                  {formattedPackValue(
                    packageVariant.packId.translatedData[locale].type,
                    packageVariant.packId.translatedData[locale].measureValue,
                    packageVariant.packId.translatedData[locale].measureIn
                  )}
                </span>
                <span className='basis-1/3 max-w-1/3 truncate'>{`${formattedPrice(producer.exchangeRate ? packageVariant.price * producer.exchangeRate : packageVariant.price)}`}</span>
              </button>
            </li>
          ))}

        {availablePackaging.length > 3 && (
          <li className='rounded-md'>
            <Link
              href={productLink}
              className='inline-block mt-1 px-2 py-1 transition-colors text-gray-600 rounded-b-md text-sm hover:text-accent'
            >
              {t('packagingOthers')}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
