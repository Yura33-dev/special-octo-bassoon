import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';

import Container from '@/components/shared/Container';
import CircleLoader from '@/components/shared/loaders/CircleLoader';
import { routing } from '@/i18n/routing';
import {
  getAllProductsByCategoryId,
  getCategoryBySlug,
  getFiltersFromProducts,
  getPageDataByName,
  getProducersByCategoryId,
} from '@/lib/api';
import { config } from '@/lib/config';
import { DEFAULT_PAGE, PRODUCT_DISPLAY_LIMIT } from '@/lib/constants';
import { locale } from '@/types';

import Filter from '../../../_components/catalog-page/Filter';
import BreadCrumbs from '../../../_components/shared/breadcrumbs/BreadCrumbs';
import ProductsList from '../../../_components/subCategory-page/ProductsList';

interface ISubcategoryPageProps {
  params: {
    locale: locale;
    mainCategorySlug: string;
    subCategorySlug: string;
  };
  searchParams: {
    page?: string;
    limit?: string;
    [key: string]: string | undefined;
  };
}

export async function generateMetadata({
  params,
}: ISubcategoryPageProps): Promise<Metadata> {
  const [mainCategory, subCategory] = await Promise.all([
    getCategoryBySlug(params.mainCategorySlug, routing.locales),
    getCategoryBySlug(params.subCategorySlug, routing.locales),
  ]);

  if (!subCategory || !mainCategory)
    return {
      title: 'Купити насіння оптом та в роздріб з доставкою по всій Україні',
    };

  const currentUrl = `${config.NEXT_PUBLIC_APP_URL}/${params.locale}/catalog/${mainCategory.slug[params.locale]}/${subCategory.slug[params.locale]}`;

  return {
    title: subCategory.meta[params.locale].title,
    metadataBase: new URL(config.NEXT_PUBLIC_APP_URL),

    alternates: {
      canonical: currentUrl,
      languages: {
        uk: `${config.NEXT_PUBLIC_APP_URL}/uk/catalog/${mainCategory.slug['uk']}/${subCategory.slug['uk']}`,
        ru: `${config.NEXT_PUBLIC_APP_URL}/ru/catalog/${mainCategory.slug['ru']}/${subCategory.slug['ru']}`,
        'x-default': `${config.NEXT_PUBLIC_APP_URL}/uk/catalog/${mainCategory.slug['uk']}/${subCategory.slug['uk']}`,
      },
    },

    other: {
      title:
        subCategory.meta[params.locale].title ??
        'Купити насіння оптом та в роздріб з доставкою по всій Україні',
      description:
        subCategory.meta[params.locale].description ??
        'Купити насіння з доставкою по Україні. Інтернет магазин продажу насіння.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
      keywords: subCategory.meta[params.locale].keywords ?? '',
    },

    openGraph: {
      title:
        subCategory.meta[params.locale].title ??
        'Купити насіння оптом та в роздріб з доставкою по всій Україні',
      description:
        subCategory.meta[params.locale].description ??
        'Купити насіння з доставкою по Україні. Інтернет магазин продажу насіння.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
      type: 'website',
      url: currentUrl,
      images: [
        {
          url:
            subCategory.image ?? `${config.NEXT_PUBLIC_APP_URL}/no-image.webp`,
          width: 1200,
          height: 630,
          alt: subCategory.name[params.locale],
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title:
        subCategory.meta[params.locale].title ??
        'Купити насіння оптом та в роздріб з доставкою по всій Україні',
      description:
        subCategory.meta[params.locale].description ??
        'Купити насіння з доставкою по Україні. Інтернет магазин продажу насіння.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
      images: [
        subCategory.image ?? `${config.NEXT_PUBLIC_APP_URL}/no-image.webp`,
      ],
    },
  };
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: ISubcategoryPageProps) {
  const locale = (await getLocale()) as locale;

  const [catalogPageData, category, subcategory] = await Promise.all([
    getPageDataByName('CatalogPage'),
    getCategoryBySlug(params.mainCategorySlug, routing.locales),
    getCategoryBySlug(params.subCategorySlug, routing.locales),
  ]);

  if (!catalogPageData || !category || !subcategory) {
    notFound();
  }

  const page = parseInt(searchParams.page || DEFAULT_PAGE);
  const limit = parseInt(searchParams.limit || PRODUCT_DISPLAY_LIMIT);

  const [{ filters }, { products, paginationData }, producers] =
    await Promise.all([
      getFiltersFromProducts(locale, { categories: subcategory.id }),
      getAllProductsByCategoryId(subcategory.id, page, limit, searchParams),
      getProducersByCategoryId(subcategory.id, locale),
    ]);

  const producersFilter = new Map<string, { title: string; slug: string }>();

  producers.forEach(producer => {
    producersFilter.set(producer.slug, {
      title: producer.translatedData[locale].title,
      slug: producer.slug,
    });
  });

  const resultProducersFilterArray = Array.from(producersFilter.values());

  const producersFilterObject = {
    slug: 'producer',
    title: 'Виробник',
    variants: resultProducersFilterArray,
  };

  const generateBreadCrumbs = [
    '',
    `catalog`,
    `catalog/${category.slug[locale]}`,
    `catalog/${category.slug[locale]}/${subcategory.slug[locale]}`,
  ];

  const generateBreadTitles = [
    ...catalogPageData.translatedData[locale].breadcrumbTitles,
    category.name[locale],
    subcategory.name[locale],
  ];

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
          <div className='flex flex-col items-stretch gap-6 lg:flex-row lg:items-start'>
            <Filter filters={[producersFilterObject, ...filters]} />
            <div className='basis-full flex flex-col gap-4'>
              <h1 className='text-center text-xl md:text-2xl'>
                {catalogPageData.translatedData[locale].h1}
              </h1>

              <Suspense
                fallback={
                  <div className='flex justify-center'>
                    <CircleLoader />
                  </div>
                }
              >
                <ProductsList
                  products={products}
                  paginationData={paginationData}
                />
              </Suspense>
            </div>
          </div>

          {subcategory.meta[locale].seoText && (
            <div className='l-container ql-snow'>
              <div
                className='ql-editor mt-20'
                dangerouslySetInnerHTML={{
                  __html: subcategory.meta[locale].seoText,
                }}
              ></div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
