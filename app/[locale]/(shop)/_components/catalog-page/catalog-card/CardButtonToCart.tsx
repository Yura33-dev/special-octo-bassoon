'use client';

import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { formattedPackValue } from '@/lib/utils';
import { useCartStore } from '@/providers/cart.provider';
import { IProduct } from '@/types';

interface ICardButtonToCardProps {
  product: IProduct;
  activePackaging: string;
}

export default function CardButtonToCart({
  product,
  activePackaging,
}: ICardButtonToCardProps) {
  const addProductToCart = useCartStore(state => state.addProduct);

  const t = useTranslations('Cart');

  const handleAddToCart = () => {
    const packVariant = product.packaging.items.filter(
      packVariant => packVariant.id === activePackaging
    );

    const productObject = {
      id: product.id,
      imgUrl: product.imgUrl,
      data: {
        name: product.data.name,
        slug: product.data.slug,
      },
      packVariant: { ...packVariant[0], orderedQuantity: 1 },
      categories: product.categories,
    };

    addProductToCart(productObject);
    toast.success(
      t('ToCart', {
        title: `${productObject.data.name} (${formattedPackValue(productObject.packVariant.type, productObject.packVariant.measureValue, productObject.packVariant.measureIn)})`,
      })
    );
  };

  return (
    <button
      className='btn bg-accent border-none text-foreground mb-5 hover:bg-primary hover:text-white uppercase text-sm sm:text-base'
      onClick={handleAddToCart}
    >
      {t('buttonToCart')}
    </button>
  );
}
