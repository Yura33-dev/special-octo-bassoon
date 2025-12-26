'use client';

import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { formattedPackValue } from '@/lib/utils';
import { useCartStore } from '@/providers/cart.provider';
import { IProductInCart, IProductMapped, locale } from '@/types';

interface ICardButtonToCardProps {
  product: IProductMapped;
  activePackaging: string;
}

export default function CardButtonToCart({
  product,
  activePackaging,
}: ICardButtonToCardProps) {
  const locale = useLocale() as locale;
  const addProductToCart = useCartStore(state => state.addProduct);

  const t = useTranslations('Cart');

  const handleAddToCart = () => {
    const packVariant = product.packaging.items.filter(
      packVariant => packVariant.packId.id === activePackaging
    );

    const productObject: IProductInCart = {
      id: product.id,
      producer: product.producer,
      imgUrl: product.imgUrl,
      translatedData: product.translatedData,
      categories: product.categories,
      packVariant: { ...packVariant[0], orderedQuantity: 1 },
    };

    addProductToCart(productObject);
    toast.success(
      t('ToCart', {
        title: `${productObject.translatedData[locale].name} (${formattedPackValue(productObject.packVariant.packId.translatedData[locale].type, productObject.packVariant.packId.translatedData[locale].measureValue, productObject.packVariant.packId.translatedData[locale].measureIn)})`,
      })
    );
  };

  return (
    <button
      className='btn bg-accent border-none text-foreground hover:bg-primary hover:text-white 
                    uppercase text-sm sm:text-base flex-0'
      onClick={handleAddToCart}
    >
      {t('buttonToCart')}
    </button>
  );
}
