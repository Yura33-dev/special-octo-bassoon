'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import UseDiscountLabels from '@/lib/hooks/useDiscountLabels';
import { formattedPackValue, getProductLinks } from '@/lib/utils';
import { IProductMapped, locale } from '@/types';

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

  const [selectedPackId, setSelectedPackId] = useState<string>(
    product.packaging.default?.id ?? product.packaging.items[0].packId.id
  );

  const { appliedLabels, handleUpdateLabels } = UseDiscountLabels({
    labels: product.labels,
  });

  const handleChangeActivePackaging = (packId: string) => {
    setSelectedPackId(packId);
  };

  const { mainCategory, subCategory, productLink } = getProductLinks(
    product,
    locale
  );

  const selectedPack =
    product.packaging.items.find(pack => pack.packId.id === selectedPackId) ??
    product.packaging.items[0];

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
            activePackaging={selectedPackId}
          />
        </div>

        <CardCategories mainCategory={mainCategory} subCategory={subCategory} />

        <CardPackVariants
          producer={product.producer}
          availablePackaging={product.packaging.items}
          activePackaging={selectedPackId}
          handleChangeActivePackaging={handleChangeActivePackaging}
          productLink={productLink}
        />
      </div>
    </>
  );
}
