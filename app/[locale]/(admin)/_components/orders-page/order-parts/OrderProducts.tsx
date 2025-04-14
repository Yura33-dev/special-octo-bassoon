import Image from 'next/image';
import { getLocale } from 'next-intl/server';

import { formattedPackValue, formattedPrice } from '@/lib/utils';
import { IProductInOrderMapped, locale } from '@/types';

interface IOrderProductsProps {
  products: Array<IProductInOrderMapped>;
}

export default async function OrderProducts({ products }: IOrderProductsProps) {
  const locale = (await getLocale()) as locale;

  return (
    <div className='mt-8 px-4'>
      <h3 className='font-semibold'>Кошик товарів</h3>

      <ul
        className='flex flex-col gap-2 mt-4 max-h-[400px] overflow-y-auto'
        role='table'
      >
        <li
          role='rowgroup'
          className='px-2 py-1 border-b-[1px] border-gray-400 mb-2'
        >
          <div role='row' className='flex gap-6'>
            <div
              role='columnheader'
              className='basis-[80px] flex-grow-0 flex-shrink-0'
            >
              <span className='sr-only'>Фото</span>
            </div>
            <div role='columnheader' className='flex-1'>
              Назва
            </div>
            <div role='columnheader' className='flex-1 text-center'>
              Упаковка
            </div>
            <div role='columnheader' className='flex-1 text-center'>
              Кількість
            </div>
            <div role='columnheader' className='flex-1 text-center'>
              Ціна
            </div>
            <div role='columnheader' className='flex-1 text-center'>
              Сума
            </div>
          </div>
        </li>
        {products.map(({ productId, packId, quantity, price }, index) => (
          <li
            key={index}
            role='rowgroup'
            className='p-2 bg-teal-700/20 rounded-md'
          >
            <div role='row' className='flex items-center gap-6'>
              <div
                role='cell'
                className='flex-shrink-0 flex-grow-0 basis-[80px]'
              >
                <div className='w-20 h-20'>
                  <Image
                    alt={`Зображення ${productId.translatedData[locale].name}`}
                    width={150}
                    height={150}
                    src={productId.image}
                    className='w-full h-full object-cover rounded-md'
                  />
                </div>
              </div>

              <div role='cell' className='flex-1'>
                <h3>{productId.translatedData[locale].name}</h3>
              </div>

              <div role='cell' className='flex-1 text-center'>
                {formattedPackValue(
                  packId.translatedData[locale].type,
                  packId.translatedData[locale].measureValue,
                  packId.translatedData[locale].measureIn
                )}
              </div>

              <div role='cell' className='flex-1 text-center'>
                {quantity}
              </div>

              <div role='cell' className='flex-1 text-center'>
                {formattedPrice(price)}
              </div>

              <div role='cell' className='flex-1 text-center'>
                {formattedPrice(quantity * price)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
