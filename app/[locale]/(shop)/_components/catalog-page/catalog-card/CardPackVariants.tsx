import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { formattedPrice } from '@/lib/utils';
import { IPackaging } from '@/types';

interface ICardPackVariantsProps {
  availablePackaging: Array<IPackaging>;
  activePackaging: string;
  productLink: string;
  handleChangeActivePackaging: (packId: string) => void;
}

export default function CardPackVariants({
  availablePackaging,
  activePackaging,
  handleChangeActivePackaging,
  productLink,
}: ICardPackVariantsProps) {
  const t = useTranslations('ProductCard');

  const packagingInStock = availablePackaging.filter(
    packVariant => packVariant.quantity === null || packVariant.quantity > 0
  );

  const visiblePackaging =
    packagingInStock.length > 3
      ? packagingInStock.slice(0, 3)
      : packagingInStock;

  const activePack =
    availablePackaging.find(pack => pack.id === activePackaging) ??
    availablePackaging[0];

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
            <li key={packageVariant.id}>
              <button
                type='button'
                className={clsx(
                  `w-full flex text-left gap-2 border-[1px] rounded-md px-2 py-1 transition-colors`,
                  activePack.id === packageVariant.id
                    ? 'border-accent'
                    : 'border-gray-200'
                )}
                onClick={() => handleChangeActivePackaging(packageVariant.id)}
              >
                <span className='basis-1/2 max-w-1/2 truncate'>{`${t(packageVariant.type)} ${packageVariant.measurements.measureValue} ${t(packageVariant.measurements.measureIn)}`}</span>
                <span className='basis-1/2 max-w-1/2 truncate'>{`${formattedPrice(packageVariant.price)}`}</span>
              </button>
            </li>
          ))}
        {packagingInStock.length > 3 && (
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
