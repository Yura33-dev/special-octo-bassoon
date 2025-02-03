'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import { formattedPackValue, formattedPrice } from '@/lib/utils';
import { useCartStore } from '@/providers/cart.provider';
import { IProduct, IProductPack } from '@/types';

interface IPackagingProps {
  product: IProduct;
}

export default function ProductVariants({ product }: IPackagingProps) {
  const t = useTranslations('Cart');
  const t2 = useTranslations('ProductPage');

  const addProductToCart = useCartStore(state => state.addProduct);

  const [activePack, setActivePack] = useState<IProductPack>(
    product.packaging.items[0]
  );

  const toggleActivePack = (pack: IProductPack) => {
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
        title: `${productObject.data.name} (${productObject.packVariant.type} ${productObject.packVariant.measureValue} ${productObject.packVariant.measureIn})`,
      })
    );
  };

  const sortedPackaging = product.packaging.items.toSorted(
    (first, second) => first.measureValue - second.measureValue
  );

  return (
    <>
      <h2 className='text-base mb-3'>{t2('ProductPackaging')}</h2>
      <ul className='mb-5 grid grid-cols-[repeat(auto-fill,_minmax(120px,_1fr))] gap-4 md:mb-10'>
        {sortedPackaging.map(pack => (
          <li key={pack.id}>
            <button
              onClick={() => toggleActivePack(pack)}
              className={clsx(
                'text-sm p-1 rounded-md text-center border-[2px] bg-teal-600/5 transition-colors',
                activePack.id === pack.id ? 'border-accent' : 'border-gray-300',
                pack.quantity <= 0 && 'border-gray-200 text-gray-400'
              )}
              disabled={pack.quantity <= 0}
            >
              {formattedPackValue(pack.type, pack.measureValue, pack.measureIn)}
            </button>
          </li>
        ))}
      </ul>

      <h2 className='text-2xl md:text-3xl font-medium flex flex-col gap-1 mb-5 md:mb-10'>
        {formattedPrice(activePack.price)}
        {activePack.showPricePerUnit && (
          <span className='text-base md:text-sm font-normal'>
            {(activePack.price / 100 / activePack.measureValue).toFixed(2)} грн/
            {activePack.measureIn}
          </span>
        )}
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
