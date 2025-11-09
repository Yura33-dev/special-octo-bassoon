import { ArrowRightLeft, HandCoins, Sprout, Truck } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

import { getAllSettings } from '@/lib/api';
import { IProductMapped, locale } from '@/types';

interface IProductInfoProps {
  product: IProductMapped;
}

export default async function ProductInfo({ product }: IProductInfoProps) {
  const locale = (await getLocale()) as locale;

  const [t, settings] = await Promise.all([
    getTranslations('ProductPage'),
    getAllSettings(),
  ]);

  return (
    <div
      className='mt-6 grid gap-8 grid-cols-[repeat(auto-fill,_1fr]
                    sm:grid-cols-[1fr_1fr] sm:gap-6
                    lg:grid-cols-[repeat(4,_minmax(200px,_1fr))]
                    lg:grid-rows-2 lg:gap-2'
    >
      <div className='bg-teal-700/10 sm:col-span-full lg:col-start-1 lg:col-end-3 lg:row-span-full p-2 rounded-md '>
        <div className='flex gap-2 justify-start items-center pb-2 border-b-[2px] border-b-gray-300'>
          <Sprout size={24} className='stroke-black' />
          <span className='text-sm uppercase font-semibold'>
            {t('ProductCharacteristics')}
          </span>
        </div>

        {product.filters && product.filters.length > 0 ? (
          <ul className='px-2 mt-4 text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
            {product.filters.map(filter => (
              <li key={filter.id} className='flex flex-col'>
                <span className='font-bold'>
                  {filter.filter.translatedData[locale].filterTitle}:
                </span>{' '}
                <span>
                  {filter.filter.variants
                    .filter(variant =>
                      filter.values.includes(variant.variantSlug)
                    )
                    .map(variant => variant.translatedData[locale].variantTitle)
                    .join(', ')}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className='px-4 text-sm mt-4'>{t('NoCharacteristics')}</p>
        )}
      </div>

      <div className='bg-teal-700/10 lg:col-start-3 lg:col-end-4 lg:row-span-full p-2 rounded-md'>
        <div className='flex gap-2 justify-start items-center pb-2 border-b-[2px] border-b-gray-300'>
          <Truck size={24} className='stroke-black' />
          <span className='text-sm uppercase font-semibold'>
            {t('ProductDelivery')}
          </span>
        </div>

        <ul className='px-4 mt-4 text-sm flex flex-col gap-2'>
          {settings?.translatedData[locale].deliveryProductMethods.map(
            method => (
              <li
                key={method}
                className='relative after:content-[""] after:block after:w-[6px] after:h-[6px] after:rounded-full after:bg-accent
                        after:absolute after:top-1/2 after:-left-4 after:-translate-y-1/2'
              >
                {method}
              </li>
            )
          )}
        </ul>
      </div>

      <div className='bg-teal-700/10 lg:col-start-4 lg:row-start-1 p-2 rounded-md '>
        <div className='flex gap-2 justify-start items-center pb-2 border-b-[2px] border-b-gray-300'>
          <HandCoins size={24} className='stroke-black' />
          <span className='text-sm uppercase font-semibold'>
            {t('ProductPayments')}
          </span>
        </div>

        <ul className='px-4 mt-4 text-sm flex flex-col gap-2'>
          {settings?.translatedData[locale].paymentProductMethods.map(
            method => (
              <li
                key={method}
                className='relative after:content-[""] after:block after:w-[6px] after:h-[6px] after:rounded-full after:bg-accent
                        after:absolute after:top-1/2 after:-left-4 after:-translate-y-1/2'
              >
                {method}
              </li>
            )
          )}
        </ul>
      </div>

      <div className='bg-teal-700/10 lg:col-start-4 lg:row-start-2 p-2 rounded-md sm:col-span-full'>
        <div className='flex gap-2 justify-start items-center pb-2 border-b-[2px] border-b-gray-300'>
          <ArrowRightLeft size={24} className='stroke-black' />
          <span className='text-sm uppercase font-semibold'>
            {t('ProductRefund')}
          </span>
        </div>

        <ul className='px-4 mt-4 text-sm flex flex-col gap-2'>
          <li>{settings?.translatedData[locale].refundProductMethod}</li>
        </ul>
      </div>
    </div>
  );
}
