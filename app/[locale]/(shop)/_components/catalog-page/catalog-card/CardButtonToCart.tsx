'use client';

import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';

// import { routing } from '@/i18n/routing';
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

    // const translatedData = routing.locales.reduce((result, locale) => {
    //   result[locale] = {
    //     name: product.translatedData[locale].name,
    //   slug: product.translatedData[locale].slug,
    //   };

    //   return result;
    // }, {} as Record<typeof routing.locales[number], {name: string, slug: string}>)

    const productObject: IProductInCart = {
      id: product.id,
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
      className='btn bg-accent border-none text-foreground mb-5 hover:bg-primary hover:text-white uppercase text-sm sm:text-base'
      onClick={handleAddToCart}
    >
      {t('buttonToCart')}
    </button>
  );
}
