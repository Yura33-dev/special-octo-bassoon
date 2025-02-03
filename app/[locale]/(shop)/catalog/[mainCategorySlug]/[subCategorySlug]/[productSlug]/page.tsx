import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import ProductImage from '@/app/[locale]/(shop)/_components/product-page/ProductImage';
import ProductInfo from '@/app/[locale]/(shop)/_components/product-page/ProductInfo';
import ProductTabs from '@/app/[locale]/(shop)/_components/product-page/ProductTabs';
import ProductVariants from '@/app/[locale]/(shop)/_components/product-page/ProductVariants';
import BreadCrumbs from '@/app/[locale]/(shop)/_components/shared/breadcrumbs/BreadCrumbs';
import Container from '@/components/shared/Container';
import {
  getCategoryBySlug,
  getPageDataByName,
  getProductBySlug,
} from '@/lib/api';
import { locale } from '@/types';

interface IProductPageProps {
  params: {
    mainCategorySlug: string;
    subCategorySlug: string;
    productSlug: string;
    locale: locale;
  };
}

export default async function ProductPage({ params }: IProductPageProps) {
  const locale = (await getLocale()) as locale;

  const [catalogPageData, category, subcategory, product] = await Promise.all([
    getPageDataByName('CatalogPage', locale),
    getCategoryBySlug(params.mainCategorySlug, locale),
    getCategoryBySlug(params.subCategorySlug, locale),
    getProductBySlug(params.productSlug, locale),
  ]);

  if (!catalogPageData || !category || !subcategory || !product) {
    notFound();
  }

  const generateBreadCrumbs = [
    '',
    `catalog`,
    `catalog/${category.slug}`,
    `catalog/${category.slug}/${subcategory.slug}`,
    `catalog/${category.slug}/${subcategory.slug}/${product.data.slug}`,
  ];

  const generateBreadTitles = [
    ...catalogPageData.data.breadcrumbTitles,
    category.name,
    subcategory.name,
    product.data.name,
  ];

  if (!product) {
    notFound();
  }

  return (
    <>
      <BreadCrumbs
        breadcrumbLinks={generateBreadCrumbs}
        breadcrumbTitles={generateBreadTitles}
      />
      <section className='mt-4'>
        <Container>
          <div className='flex flex-col gap-5 md:flex-row md:gap-10'>
            <ProductImage src={product.imgUrl} alt={product.data.name} />

            <div className='basis-1/2'>
              <h1 className='text-xl mb-5 md:text-4xl md:mb-10'>
                {product.data.name}
              </h1>
              <ProductVariants product={product} />
            </div>
          </div>

          <ProductInfo product={product} />

          <ProductTabs
            tabs={{
              descriptionTab: product.data.description,
              reviewsTab: [],
              buttons: ['Description', 'Reviews'],
            }}
          />
        </Container>
      </section>
    </>
  );
}
