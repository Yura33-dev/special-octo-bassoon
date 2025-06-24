import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';

import ProductImage from '@/app/[locale]/(shop)/_components/product-page/ProductImage';
import ProductInfo from '@/app/[locale]/(shop)/_components/product-page/ProductInfo';
import ProductTabs from '@/app/[locale]/(shop)/_components/product-page/ProductTabs';
import ProductVariants from '@/app/[locale]/(shop)/_components/product-page/ProductVariants';
import SimilarProducts from '@/app/[locale]/(shop)/_components/product-page/similar-products/SimilarProducts';
import BreadCrumbs from '@/app/[locale]/(shop)/_components/shared/breadcrumbs/BreadCrumbs';
import Container from '@/components/shared/Container';
import { routing } from '@/i18n/routing';
import {
  getCategoryBySlug,
  getPageDataByName,
  getProductBySlug,
} from '@/lib/api';
import { config } from '@/lib/config';
import { locale } from '@/types';

interface IProductPageProps {
  params: {
    mainCategorySlug: string;
    subCategorySlug: string;
    productSlug: string;
    locale: locale;
  };
}

export async function generateMetadata({
  params,
}: IProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.productSlug, routing.locales);
  if (!product) return { title: 'Proground | Невідомий продукт' };

  const currentUrl = `${config.NEXT_PUBLIC_APP_URL}/${params.locale}/catalog/${product.categories[0].slug[params.locale]}/${product.categories[1].slug[params.locale]}/${product.translatedData[params.locale].slug}`;

  return {
    title: product.translatedData[params.locale].meta.title,
    metadataBase: new URL(config.NEXT_PUBLIC_APP_URL),

    alternates: {
      canonical: currentUrl,
      languages: {
        uk: `${config.NEXT_PUBLIC_APP_URL}/uk/catalog/${product.categories[0].slug['uk']}/${product.categories[1].slug['uk']}/${product.translatedData['uk'].slug}`,
        ru: `${config.NEXT_PUBLIC_APP_URL}/ru/catalog/${product.categories[0].slug['ru']}/${product.categories[1].slug['ru']}/${product.translatedData['ru'].slug}`,
        'x-default': `${config.NEXT_PUBLIC_APP_URL}/uk/catalog/${product.categories[0].slug['uk']}/${product.categories[1].slug['uk']}/${product.translatedData['uk'].slug}`,
      },
    },

    other: {
      title: product.translatedData[params.locale].meta.title,
      description: product.translatedData[params.locale].meta.description,
      keywords: product.translatedData[params.locale].meta.keywords ?? '',
    },

    openGraph: {
      title: product.translatedData[params.locale].meta.title,
      description: product.translatedData[params.locale].meta.description,
      url: currentUrl,
      type: 'website',
      images: [
        {
          url: product.imgUrl ?? `${config.NEXT_PUBLIC_APP_URL}/no-image.webp`,
          width: 1200,
          height: 630,
          alt: product.translatedData[params.locale].name,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: product.translatedData[params.locale].name,
      description: product.translatedData[params.locale].meta.description,
      images: [product.imgUrl ?? `${config.NEXT_PUBLIC_APP_URL}/no-image.webp`],
    },
  };
}

export default async function ProductPage({ params }: IProductPageProps) {
  const locale = (await getLocale()) as locale;

  const [catalogPageData, category, subcategory, product, t] =
    await Promise.all([
      getPageDataByName('CatalogPage'),
      getCategoryBySlug(params.mainCategorySlug, routing.locales),
      getCategoryBySlug(params.subCategorySlug, routing.locales),
      getProductBySlug(params.productSlug, routing.locales),
      getTranslations('ProductPage'),
    ]);

  if (!catalogPageData || !category || !subcategory || !product) {
    notFound();
  }

  const generateBreadCrumbs = [
    '',
    `catalog`,
    `catalog/${category.slug[locale]}`,
    `catalog/${category.slug[locale]}/${subcategory.slug[locale]}`,
    `catalog/${category.slug[locale]}/${subcategory.slug[locale]}/${product.translatedData[locale].slug}`,
  ];

  const generateBreadTitles = [
    ...catalogPageData.translatedData[locale].breadcrumbTitles,
    category.name[locale],
    subcategory.name[locale],
    product.translatedData[locale].name,
  ];

  if (!product) {
    notFound();
  }

  return (
    <>
      <section className='my-4'>
        <BreadCrumbs
          breadcrumbLinks={generateBreadCrumbs}
          breadcrumbTitles={generateBreadTitles}
        />
      </section>

      <section>
        <Container>
          <div className='flex flex-col gap-5 sm:flex-row md:gap-10'>
            <ProductImage
              src={product.imgUrl}
              alt={product.translatedData[locale].name}
            />

            <div className='basis-1/2'>
              <h1 className='text-xl mb-5 md:text-4xl md:mb-10'>
                {product.translatedData[locale].name}
              </h1>
              <ProductVariants product={product} />
            </div>
          </div>

          <ProductInfo product={product} />
        </Container>
      </section>

      <section className='mt-10'>
        <Container>
          <h2 className='text-3xl font-semibold mb-8'>{t('AboutProduct')}</h2>
          <ProductTabs
            tabs={{
              descriptionTab: product.translatedData[locale].description,
              reviewsTab: [],
              buttons: ['Description', 'Reviews'],
            }}
          />
        </Container>
      </section>

      <section className='mt-10'>
        <Container>
          <h2 className='text-3xl font-semibold mb-8'>
            {t('SimilarProducts')}
          </h2>
          <SimilarProducts categoryId={subcategory.id} />
        </Container>
      </section>
    </>
  );
}
