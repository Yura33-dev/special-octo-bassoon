import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
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

import Filter from '../../_components/catalog-page/Filter';
import BreadCrumbsWrapper from '../../_components/shared/breadcrumbs/BreadCrumbsWrapper';
import ProductsListClient from '../../_components/subCategory-page/ProductsListClient';

interface IMainCategoryPageProps {
  params: {
    mainCategorySlug: string;
    locale: locale;
  };
  searchParams: {
    page?: string;
    limit?: string;
    [key: string]: string | undefined;
  };
}

export async function generateMetadata({
  params,
}: IMainCategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(
    params.mainCategorySlug,
    routing.locales
  );

  if (!category)
    return {
      title: 'Купити насіння оптом та в роздріб з доставкою по всій Україні',
    };

  const currentUrl = `${config.NEXT_PUBLIC_APP_URL}/${params.locale}/catalog/${category.slug[params.locale]}`;

  return {
    title: category.meta[params.locale].title,
    metadataBase: new URL(config.NEXT_PUBLIC_APP_URL),

    alternates: {
      canonical: currentUrl,
      languages: {
        uk: `${config.NEXT_PUBLIC_APP_URL}/uk/catalog/${category.slug['uk']}`,
        ru: `${config.NEXT_PUBLIC_APP_URL}/ru/catalog/${category.slug['ru']}`,
        'x-default': `${config.NEXT_PUBLIC_APP_URL}/uk/catalog/${category.slug['uk']}`,
      },
    },

    other: {
      title:
        category.meta[params.locale].title ??
        'Купити насіння оптом та в роздріб з доставкою по всій Україні',
      description:
        category.meta[params.locale].description ??
        'Купити насіння з доставкою по Україні. Інтернет магазин продажу насіння.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
      keywords: category.meta[params.locale].keywords ?? '',
    },

    openGraph: {
      title:
        category.meta[params.locale].title ??
        'Купити насіння оптом та в роздріб з доставкою по всій Україні',
      description:
        category.meta[params.locale].description ??
        'Купити насіння з доставкою по Україні. Інтернет магазин продажу насіння.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
      type: 'website',
      url: currentUrl,
      images: [
        {
          url: category.image ?? `${config.NEXT_PUBLIC_APP_URL}/no-image.webp`,
          width: 1200,
          height: 630,
          alt: category.name[params.locale],
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title:
        category.meta[params.locale].title ??
        'Купити насіння оптом та в роздріб з доставкою по всій Україні',
      description:
        category.meta[params.locale].description ??
        'Купити насіння з доставкою по Україні. Інтернет магазин продажу насіння.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
      images: [category.image ?? `${config.NEXT_PUBLIC_APP_URL}/no-image.webp`],
    },
  };
}

export default async function MainCategoryPage({
  params,
  searchParams,
}: IMainCategoryPageProps) {
  const locale = (await getLocale()) as locale;

  const [catalogPageData, category] = await Promise.all([
    getPageDataByName('CatalogPage'),
    getCategoryBySlug(params.mainCategorySlug, routing.locales),
  ]);

  if (!catalogPageData || !category) {
    notFound();
  }

  const page = parseInt(searchParams.page || DEFAULT_PAGE);
  const limit = parseInt(searchParams.limit || PRODUCT_DISPLAY_LIMIT);

  const [{ filters }, { products, paginationData }, producers] =
    await Promise.all([
      getFiltersFromProducts(locale, { categories: category.id }),
      getAllProductsByCategoryId(category.id, page, limit, searchParams),
      getProducersByCategoryId(category.id, locale),
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
    `catalog/${category?.slug[params.locale]}`,
  ];

  const generateBreadTitles = [
    ...catalogPageData.translatedData[params.locale].breadcrumbTitles,
    category.name[params.locale],
  ];

  return (
    <BreadCrumbsWrapper
      breadcrumbLinks={generateBreadCrumbs}
      breadcrumbTitles={generateBreadTitles}
    >
      <section>
        <Container>
          <div className='flex flex-col items-stretch gap-6 lg:flex-row lg:items-start'>
            <Filter filters={[producersFilterObject, ...filters]} />
            <div className='basis-full flex flex-col gap-4'>
              <h1 className='text-center text-xl md:text-2xl'>
                {catalogPageData.translatedData[locale].h1}
              </h1>

              <ProductsListClient
                products={products}
                paginationData={paginationData}
              />
            </div>
          </div>

          {category.meta[params.locale].seoText && (
            <div className='l-container ql-snow'>
              <div
                className='ql-editor mt-20'
                dangerouslySetInnerHTML={{
                  __html: category.meta[params.locale].seoText ?? '',
                }}
              ></div>
            </div>
          )}
        </Container>
      </section>
    </BreadCrumbsWrapper>
  );
}
