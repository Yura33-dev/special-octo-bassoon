'use client';

import { useLocale } from 'next-intl';
import { useState } from 'react';

import { getProductLinks } from '@/lib/utils';
import { IProductMapped, locale } from '@/types';

import CardButtonToCart from './CardButtonToCart';
import CardCategories from './CardCategories';
import CardImage from './CardImage';
import CardInfo from './CardInfo';
import CardPackVariants from './CardPackVariants';

interface ICardProps {
  product: IProductMapped;
}

export default function Card({ product }: ICardProps) {
  const locale = useLocale() as locale;

  const { mainCategory, subCategory, productLink } = getProductLinks(
    product,
    locale
  );

  const [selectedPackId, setSelectedPackId] = useState<string>(
    product.packaging.default?.id ?? product.packaging.items[0].packId.id
  );

  const handleChangeActivePackaging = (packId: string) => {
    setSelectedPackId(packId);
  };

  return (
    <li className='bg-white rounded-t-md rounded-b-md group lg:hover:rounded-b-none w-full max-w-[350px] sm:max-w-none lg:max-w-[280px]'>
      <CardImage
        productLink={productLink}
        productName={product.translatedData[locale].name}
        productLabels={product.labels}
        productImage={product.imgUrl}
      />

      <div className='flex flex-col p-4 relative'>
        <h3 className='text-lg sm:text-xl font-semibold text-center mb-2 max-w-full truncate'>
          {product.translatedData[locale].name}
        </h3>

        <span className='text-center text-sm block mb-1'>
          {product.producer.translatedData[locale].title}
        </span>

        <CardInfo
          producer={product.producer}
          availablePackaging={product.packaging.items}
          activePackaging={selectedPackId}
        />

        <CardButtonToCart product={product} activePackaging={selectedPackId} />

        <CardCategories mainCategory={mainCategory} subCategory={subCategory} />

        <CardPackVariants
          producer={product.producer}
          availablePackaging={product.packaging.items}
          activePackaging={selectedPackId}
          handleChangeActivePackaging={handleChangeActivePackaging}
          productLink={productLink}
        />
      </div>
    </li>
  );
}
