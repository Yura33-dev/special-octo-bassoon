import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import ProductImage from '@/app/[locale]/(shop)/_components/product-page/ProductImage';
import ProductInfo from '@/app/[locale]/(shop)/_components/product-page/ProductInfo';
import ProductTabs from '@/app/[locale]/(shop)/_components/product-page/ProductTabs';
import ProductVariants from '@/app/[locale]/(shop)/_components/product-page/ProductVariants';
import Container from '@/components/shared/Container';
import { getProductBySlug } from '@/lib/api/products/getProductBySlug';
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

  const product = await getProductBySlug(params.productSlug, locale);

  if (!product) {
    notFound();
  }

  return (
    <section className='mt-4'>
      <Container>
        <div className='flex flex-col gap-5 md:flex-row md:gap-10'>
          <ProductImage src={product.imgUrl} alt={product.data.name} />

          <div className='basis-1/2'>
            <h1 className='text-xl mb-5 md:text-4xl md:mb-10'>
              {product.data.name}
            </h1>
            <ProductVariants product={product} packagings={product.packaging} />
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
  );
}
