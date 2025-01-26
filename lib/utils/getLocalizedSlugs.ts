'use server';

import { locale } from '@/types';

import { getCategorySlug, getProductSlug } from '../api';

export async function getLocalizedSlugs(
  params: {
    mainCategorySlug: string | null;
    subCategorySlug: string | null;
    productSlug: string | null;
  },
  currentLocale: locale,
  targetLocale: locale
): Promise<{
  mainCategorySlug: string | null;
  subCategorySlug: string | null;
  productSlug: string | null;
}> {
  const { mainCategorySlug, subCategorySlug, productSlug } = params;

  const mainCategory = await getCategorySlug(
    mainCategorySlug,
    currentLocale,
    targetLocale
  );

  const subCategory = await getCategorySlug(
    subCategorySlug,
    currentLocale,
    targetLocale
  );

  const product = await getProductSlug(
    productSlug,
    currentLocale,
    targetLocale
  );

  return {
    mainCategorySlug: mainCategory,
    subCategorySlug: subCategory,
    productSlug: product,
  };
}
