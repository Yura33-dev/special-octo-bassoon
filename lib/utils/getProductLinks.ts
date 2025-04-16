import { IProductInCart, IProductMapped, locale } from '@/types';

export const getProductLinks = (
  product: IProductMapped | IProductInCart,
  locale: locale
) => {
  let mainCategorySlug: string | undefined;
  let mainCategoryName: string | undefined;
  let subCategorySlug: string | undefined;
  let subCategoryName: string | undefined;

  product.categories.forEach(category => {
    if (category.main) {
      mainCategorySlug = category.slug[locale];
      mainCategoryName = category.name[locale];
    } else {
      subCategorySlug = category.slug[locale];
      subCategoryName = category.name[locale];
    }
  });

  const productSlug = product.translatedData[locale].slug;

  return {
    mainCategory: {
      name: mainCategoryName,
      link: `/catalog/${mainCategorySlug}/`,
    },
    subCategory: {
      name: subCategoryName,
      link: `/catalog/${mainCategorySlug}/${subCategorySlug}`,
    },
    productLink: `/catalog/${mainCategorySlug}/${subCategorySlug}/${productSlug}`,
  };
};
