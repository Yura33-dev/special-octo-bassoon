'use client';

import { CircleCheck, CircleX } from 'lucide-react';
import Image from 'next/image';
import { useLocale } from 'next-intl';

import { formattedPackValue, formattedPrice } from '@/lib/utils';
import { IProductMapped } from '@/types';

import EditButton from '../../shared/EditButton';

interface IProductItemProps {
  product: IProductMapped;
}

export default function ProductItem({ product }: IProductItemProps) {
  const locale = useLocale();
  return (
    <li key={product.id} className='bg-white rounded-md'>
      <div className='h-40'>
        <Image
          src={product.imgUrl}
          width={500}
          height={250}
          alt={`Картина товару ${product.translatedData[locale].name}`}
          className='w-full h-full object-cover rounded-md'
        />
      </div>

      <div className='p-2'>
        <h2 className='text-lg font-medium'>
          {product.translatedData[locale].name}
        </h2>
        <p className='text-sm'>
          <span className='font-semibold'>Виробник:</span> {product.producer}
        </p>

        <ul className='text-sm mt-4'>
          {product.categories.map(category => (
            <li key={category.id}>
              <span className='font-semibold'>
                {category.main ? 'Категорія' : 'Підкатегорія'}:
              </span>{' '}
              {category.name[locale]}
            </li>
          ))}
        </ul>

        <p className='mt-4 text-sm flex items-center gap-4'>
          Активність:
          <span>
            {product.visible ? (
              <CircleCheck className='text-green-600 w-5 h-5' />
            ) : (
              <CircleX className='text-red-600 w-5 h-5' />
            )}
          </span>
        </p>

        <div className='mt-4 text-sm'>
          <span className='font-medium'>Пакування:</span>
          <ul className='mt-2 flex flex-col gap-2 text-xs min-h-[112px]'>
            {product.packaging.items.map(pack => (
              <li
                key={pack.packId.id}
                className='bg-teal-700/20 p-2 rounded-md text-foreground'
              >
                {formattedPackValue(
                  pack.packId.translatedData[locale].type,
                  pack.packId.translatedData[locale].measureValue,
                  pack.packId.translatedData[locale].measureIn
                )}{' '}
                - {formattedPrice(pack.price)}
              </li>
            ))}
          </ul>
        </div>

        <div className='mt-4 min-h-[52px]'>
          <span className='font-medium'>Теги:</span>
          {product.labels.length > 0 ? (
            <ul className='flex gap-2'>
              {product.labels.map(label => (
                <li
                  key={label}
                  className='py-1 px-2 bg-accent rounded-md text-sm'
                >
                  {label}
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-sm'>Відсутні</p>
          )}
        </div>

        <EditButton
          href={`/dashboard/products/${product.translatedData[locale].slug}`}
          title='Редагувати'
          classNameBtn='mt-6'
        />
      </div>
    </li>
  );
}
