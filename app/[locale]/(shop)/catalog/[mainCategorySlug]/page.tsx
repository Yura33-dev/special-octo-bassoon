import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import Container from '@/components/shared/Container';
import { routing } from '@/i18n/routing';
import { getCategoryBySlug, getPageDataByName } from '@/lib/api';
import { config } from '@/lib/config';
import { locale } from '@/types';

import BreadCrumbs from '../../_components/shared/breadcrumbs/BreadCrumbs';
import CatalogGrid from '../../_components/shared/catalogGrid/CatalogGrid';

interface IMainCategoryPageProps {
  params: {
    mainCategorySlug: string;
    locale: locale;
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
}: IMainCategoryPageProps) {
  const locale = (await getLocale()) as locale;

  const [catalogPageData, category] = await Promise.all([
    getPageDataByName('CatalogPage'),
    getCategoryBySlug(params.mainCategorySlug, routing.locales),
  ]);

  if (!catalogPageData || !category) {
    notFound();
  }

  const generateBreadCrumbs = [
    '',
    `catalog`,
    `catalog/${category?.slug[locale]}`,
  ];

  const generateBreadTitles = [
    ...catalogPageData.translatedData[locale].breadcrumbTitles,
    category.name[locale],
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
          <CatalogGrid
            parentSlug={params.mainCategorySlug}
            categories={category.childCategories}
          />

          {category.meta[locale].seoText && (
            <div className='l-container ql-snow'>
              <div
                className='ql-editor mt-20'
                dangerouslySetInnerHTML={{
                  __html: category.meta[locale].seoText,
                }}
              ></div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
