'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { formattedPrice } from '@/lib/utils';
import { useCartStore } from '@/providers/cart.provider';
import { IPackaging, IProduct } from '@/types';

interface IPackagingProps {
  packagings: Array<IPackaging>;
  product: IProduct;
}

export default function ProductVariants({ product }: IPackagingProps) {
  const t = useTranslations('Cart');
  const t2 = useTranslations('ProductPage');

  const addProductToCart = useCartStore(state => state.addProduct);

  const [activePack, setActivePack] = useState<IPackaging>(
    product.packaging[0]
  );

  const toggleActivePack = (pack: IPackaging) => {
    setActivePack(pack);
  };

  const handleAddToCart = () => {
    const productObject = {
      id: product.id,
      imgUrl: product.imgUrl,
      data: {
        name: product.data.name,
        slug: product.data.slug,
      },
      packVariant: { ...activePack, orderedQuantity: 1 },
      categories: product.categories,
    };

    addProductToCart(productObject);
    toast.success(
      t('ToCart', {
        title: `${productObject.data.name} (${productObject.packVariant.data.type} ${productObject.packVariant.data.measureValue} ${productObject.packVariant.data.measureIn})`,
      })
    );
  };

  const sortedPackaging = product.packaging.toSorted(
    (first, second) => first.data.measureValue - second.data.measureValue
  );

  return (
    <>
      <h2 className='text-base mb-3'>{t2('ProductPackaging')}</h2>
      <ul className='mb-5 grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] gap-4 md:mb-10'>
        {sortedPackaging.map(pack => (
          <li
            key={pack.id}
            onClick={() => toggleActivePack(pack)}
            className={clsx(
              'text-sm p-1 rounded-md text-center border-[2px] bg-teal-600/5 transition-colors hover:cursor-pointer',
              activePack.id === pack.id ? 'border-accent' : 'border-gray-300'
            )}
          >
            {pack.data.type} {pack.data.measureValue} {pack.data.measureIn}
          </li>
        ))}
      </ul>

      <h2 className='text-2xl md:text-3xl font-medium flex flex-col gap-1 mb-5 md:mb-10'>
        {formattedPrice(activePack.price)}
        <span className='text-base md:text-sm font-normal'>
          {(activePack.price / 100 / activePack.data.measureValue).toFixed(2)}{' '}
          грн/{activePack.data.measureIn}
        </span>
      </h2>

      <button
        className='btn w-full lg:max-w-[150px] border-none bg-accent uppercase text-base hover:bg-primary hover:text-white'
        onClick={handleAddToCart}
      >
        {t('buttonToCart')}
      </button>
    </>
  );
}
