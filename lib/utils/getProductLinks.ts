import { IProductInCart } from '@/providers/cart.provider';
import { IProduct } from '@/types';

export const getProductLinks = (product: IProduct | IProductInCart) => {
  let mainCategorySlug: string | undefined;
  let mainCategoryName: string | undefined;
  let subCategorySlug: string | undefined;
  let subCategoryName: string | undefined;

  product.categories.forEach(category => {
    if (category.main) {
      mainCategorySlug = category.slug;
      mainCategoryName = category.name;
    } else {
      subCategorySlug = category.slug;
      subCategoryName = category.name;
    }
  });

  const productSlug = product.data.slug;

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
