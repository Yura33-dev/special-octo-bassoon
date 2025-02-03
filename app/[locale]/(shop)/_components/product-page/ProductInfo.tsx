import { ArrowRightLeft, HandCoins, Sprout, Truck } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

import { getAllSettings } from '@/lib/api';
import { IProduct, locale } from '@/types';

interface IDeliveryAndPaymentProps {
  product: IProduct;
}

export default async function ProductInfo({
  product,
}: IDeliveryAndPaymentProps) {
  const locale = (await getLocale()) as locale;

  const [t, settings] = await Promise.all([
    getTranslations('ProductPage'),
    getAllSettings(locale),
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
        {product.data.characteristics ? (
          <ul className='px-2 mt-4 text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
            {product.data.characteristics.map((item, index) => (
              <li key={index} className='flex flex-col'>
                <span className='font-bold'>{item[0]}:</span>{' '}
                <span>{item[1]}</span>
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
          {settings[0].translatedData.deliveryProductMethods.map(method => (
            <li
              key={method}
              className='relative after:content-[""] after:block after:w-[6px] after:h-[6px] after:rounded-full after:bg-accent
                        after:absolute after:top-1/2 after:-left-4 after:-translate-y-1/2'
            >
              {method}
            </li>
          ))}
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
          {settings[0].translatedData.paymentProductMethods.map(method => (
            <li
              key={method}
              className='relative after:content-[""] after:block after:w-[6px] after:h-[6px] after:rounded-full after:bg-accent
                        after:absolute after:top-1/2 after:-left-4 after:-translate-y-1/2'
            >
              {method}
            </li>
          ))}
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
          <li>{settings[0].translatedData.refundProductMethod}</li>
        </ul>
      </div>
    </div>
  );
}
