'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import { formattedPackValue, formattedPrice } from '@/lib/utils';
import { IProductInOrderMapped, locale } from '@/types';

import DeleteButton from '../../shared/forms-elements/DeleteButton';

interface IOrderProductsProps {
  products: Array<IProductInOrderMapped>;
  className?: string;
  titleClassName?: string;
  isAddOrder?: boolean;
  onRemoveProduct?: (productId: string, packId: string) => void;
}

export default function OrderProducts({
  products,
  className,
  titleClassName,
  isAddOrder = false,
  onRemoveProduct,
}: IOrderProductsProps) {
  const locale = useLocale() as locale;

  return (
    <div className={clsx(className && className)}>
      <h3 className={clsx(titleClassName && titleClassName)}>Кошик товарів</h3>

      {products.length > 0 && (
        <div className='overflow-scroll'>
          <ul
            className='min-w-[900px] flex flex-col gap-2 mt-4 max-h-[400px]'
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
                {isAddOrder && (
                  <div role='columnheader' className='flex-1 text-center'>
                    Дія
                  </div>
                )}
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
                    {formattedPrice(
                      productId.producer.exchangeRate
                        ? price * productId.producer.exchangeRate
                        : price
                    )}
                  </div>

                  <div role='cell' className='flex-1 text-center'>
                    {formattedPrice(
                      productId.producer.exchangeRate
                        ? price * productId.producer.exchangeRate * quantity
                        : price * quantity
                    )}
                  </div>

                  {isAddOrder && onRemoveProduct && (
                    <div role='cell' className='flex-1 text-center'>
                      <DeleteButton
                        onClick={() => onRemoveProduct(productId.id, packId.id)}
                        isSubmitting={false}
                        withoutSpinner
                        title={null}
                        className='mx-auto'
                      />
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
