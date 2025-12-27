'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { UseDiscountLabels } from '@/lib/hooks';
import { formattedPackValue, getProductLinks } from '@/lib/utils';
import { IProductMapped, IProductPackItemMapped, locale } from '@/types';

import CardButtonToCart from './CardButtonToCart';
import CardCategories from './CardCategories';
import CardImage from './CardImage';
import CardPackVariants from './CardPackVariants';
import CardPrice from './CardPrice';

interface IProductCardProps {
  product: IProductMapped;
}

export default function ProductCard({ product }: IProductCardProps) {
  const locale = useLocale() as locale;
  const t = useTranslations('ProductCard');

  const [selectedPack, setSelectedPack] = useState<IProductPackItemMapped>(
    product.packaging.items.find(
      pack => pack.packId === product.packaging.default
    ) ?? product.packaging.items[0]
  );

  const { appliedLabels, handleUpdateLabels } = UseDiscountLabels({
    labels: product.labels,
  });

  const handleChangeActivePackaging = (pack: IProductPackItemMapped) => {
    setSelectedPack(pack);
  };

  const { mainCategory, subCategory, productLink } = getProductLinks(
    product,
    locale
  );

  return (
    <>
      <CardImage
        productLink={productLink}
        productName={product.translatedData[locale].name}
        productLabels={appliedLabels}
        productImage={product.imgUrl}
      />

      <div className='flex flex-col p-4 relative flex-1'>
        <h3 className='text-lg sm:text-xl font-semibold text-center mb-2 max-w-full truncate'>
          {product.translatedData[locale].name}
        </h3>

        <span className='text-center text-sm block mb-1'>
          {product.producer.translatedData[locale].title}
        </span>

        <CardPrice
          producer={product.producer}
          selectedPack={selectedPack}
          setDiscountLabel={handleUpdateLabels}
        />

        <span className='badge border-none bg-primary text-white text-xs mb-3 block mx-auto leading-relaxed'>
          {formattedPackValue(
            selectedPack.packId.translatedData[locale].type,
            selectedPack.packId.translatedData[locale].measureValue,
            selectedPack.packId.translatedData[locale].measureIn
          )}
        </span>

        <div className='mb-5 flex-1 flex flex-col justify-end gap-y-3'>
          <p className='text-center text-xs sm:text-sm'>{t('bulk')}</p>

          <CardButtonToCart
            product={product}
            activePackaging={selectedPack.packId.id}
          />
        </div>

        <CardCategories mainCategory={mainCategory} subCategory={subCategory} />

        <CardPackVariants
          producer={product.producer}
          packaging={product.packaging.items}
          activePackaging={selectedPack}
          handleChangeActivePackaging={handleChangeActivePackaging}
          productLink={productLink}
        />
      </div>
    </>
  );
}
