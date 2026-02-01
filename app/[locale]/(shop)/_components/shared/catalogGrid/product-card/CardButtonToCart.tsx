'use client';

import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { formattedPackValue } from '@/lib/utils';
import { useCartStore } from '@/providers/cart.provider';
import {
  IProductInCart,
  IProductMapped,
  IProductPackItemMapped,
  locale,
} from '@/types';

interface ICardButtonToCardProps {
  product: IProductMapped;
  activePackaging: IProductPackItemMapped;
}

export default function CardButtonToCart({
  product,
  activePackaging,
}: ICardButtonToCardProps) {
  const locale = useLocale() as locale;
  const addProductToCart = useCartStore(state => state.addProduct);

  const t = useTranslations('Cart');
  const tCatalogPage = useTranslations('CatalogPage');

  const handleAddToCart = () => {
    const packVariant = product.packaging.items.filter(
      packVariant => packVariant.packId.id === activePackaging.packId.id
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
      className={clsx(
        'btn bg-accent border-none text-foreground hover:bg-primary hover:text-white uppercase text-sm sm:text-base flex-0 disabled:bg-gray-300 disabled:hover:cursor-not-allowed'
      )}
      onClick={handleAddToCart}
      disabled={!activePackaging.inStock && activePackaging.madeToOrder}
    >
      {!activePackaging.inStock &&
        activePackaging.madeToOrder &&
        tCatalogPage('ProductMadeToOrder')}

      {activePackaging.inStock && t('buttonToCart')}
    </button>
  );
}
