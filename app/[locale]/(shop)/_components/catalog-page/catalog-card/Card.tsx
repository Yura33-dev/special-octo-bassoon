'use client';

import { useState } from 'react';

import { getProductLinks } from '@/lib/utils';
import { IProduct } from '@/types';

import CardButtonToCart from './CardButtonToCart';
import CardCategories from './CardCategories';
import CardImage from './CardImage';
import CardInfo from './CardInfo';
import CardPackVariants from './CardPackVariants';

interface ICardProps {
  product: IProduct;
}

export default function Card({ product }: ICardProps) {
  const { mainCategory, subCategory, productLink } = getProductLinks(product);

  const [selectedPackId, setSelectedPackId] = useState<string>(
    product.packaging.find(pack => pack.default)?.id ?? product.packaging[0].id
  );

  const handleChangeActivePackaging = (packId: string) => {
    setSelectedPackId(packId);
  };

  return (
    <li className='bg-white rounded-t-md rounded-b-md group lg:hover:rounded-b-none w-full max-w-[350px] sm:max-w-none'>
      <CardImage
        productLink={productLink}
        productName={product.data.name}
        productLabels={product.labels}
        productImage={product.imgUrl}
      />

      <div className='flex flex-col p-4 relative'>
        <h3 className='text-lg sm:text-xl font-semibold text-center mb-3 max-w-full truncate'>
          {product.data.name}
        </h3>

        <CardInfo
          availablePackaging={product.packaging}
          activePackaging={selectedPackId}
        />

        <CardButtonToCart product={product} activePackaging={selectedPackId} />

        <CardCategories mainCategory={mainCategory} subCategory={subCategory} />

        <CardPackVariants
          availablePackaging={product.packaging}
          activePackaging={selectedPackId}
          handleChangeActivePackaging={handleChangeActivePackaging}
        />
      </div>
    </li>
  );
}
