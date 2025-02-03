import { useState } from 'react';

import { getProductLinks } from '@/lib/utils';
import { IProduct } from '@/types';

import CardButtonToCart from '../../catalog-page/catalog-card/CardButtonToCart';
import CardCategories from '../../catalog-page/catalog-card/CardCategories';
import CardImage from '../../catalog-page/catalog-card/CardImage';
import CardInfo from '../../catalog-page/catalog-card/CardInfo';
import CardPackVariants from '../../catalog-page/catalog-card/CardPackVariants';

interface INewProductSlideProps {
  product: IProduct;
}

export default function NewProductSlide({ product }: INewProductSlideProps) {
  const { mainCategory, subCategory, productLink } = getProductLinks(product);

  const [selectedPackId, setSelectedPackId] = useState<string>(
    product.packaging.default?.id ?? product.packaging.items[0].id
  );

  const handleChangeActivePackaging = (packId: string) => {
    setSelectedPackId(packId);
  };

  return (
    <div className='bg-white rounded-t-md rounded-b-md group lg:hover:rounded-b-none w-full'>
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
          availablePackaging={product.packaging.items}
          activePackaging={selectedPackId}
        />

        <CardButtonToCart product={product} activePackaging={selectedPackId} />

        <CardCategories mainCategory={mainCategory} subCategory={subCategory} />

        <CardPackVariants
          availablePackaging={product.packaging.items}
          activePackaging={selectedPackId}
          handleChangeActivePackaging={handleChangeActivePackaging}
          productLink={productLink}
        />
      </div>
    </div>
  );
}
