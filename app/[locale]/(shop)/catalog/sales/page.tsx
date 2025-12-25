import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Container from '@/components/shared/Container';
import {
  // getAllProducers,
  getAllProductsByLabels,
  getFiltersFromProducts,
  getPageDataByName,
  getProducersFromProducts,
} from '@/lib/api';
import { config } from '@/lib/config';
import { DEFAULT_PAGE, PRODUCT_DISPLAY_LIMIT } from '@/lib/constants';
import { locale } from '@/types';

import Filter from '../../_components/catalog-page/Filter';
import BreadCrumbsWrapper from '../../_components/shared/breadcrumbs/BreadCrumbsWrapper';
import ProductsList from '../../_components/subCategory-page/ProductsList';

interface ISalesPageProps {
  params: {
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
}: ISalesPageProps): Promise<Metadata> {
  const salesPageData = await getPageDataByName('CatalogPage');

  if (!salesPageData) {
    return {
      title: 'ProGround | Акційне насіння овочів та засоби захисту рослин',
      other: {
        title: 'Акційне насіння оптом та в роздріб з доставкою по всій Україні',
        description:
          'Акційне насіння та засоби захисту рослин з доставкою по Україні. Інтернет магазин продажу насіння та ЗЗР.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
      },
    };
  }

  const currentUrl = `${config.NEXT_PUBLIC_APP_URL}/${params.locale}/catalog/sales`;

  return {
    title: salesPageData.translatedData[params.locale].meta.title,
    metadataBase: new URL(config.NEXT_PUBLIC_APP_URL),

    alternates: {
      canonical: currentUrl,
      languages: {
        uk: `${config.NEXT_PUBLIC_APP_URL}/uk/catalog/sales`,
        ru: `${config.NEXT_PUBLIC_APP_URL}/ru/catalog/sales`,
        'x-default': `${config.NEXT_PUBLIC_APP_URL}/uk/catalog/sales`,
      },
    },

    other: {
      title:
        salesPageData.translatedData[params.locale].meta.title ??
        'Акційне насіння оптом та в роздріб з доставкою по всій Україні',
      description:
        salesPageData.translatedData[params.locale].meta.description ??
        'Акційне насіння з доставкою по Україні. Інтернет магазин продажу насіння.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
      keywords: salesPageData.translatedData[params.locale].meta.keywords ?? '',
    },

    openGraph: {
      title:
        salesPageData.translatedData[params.locale].meta.title ??
        'Акційне насіння оптом та в роздріб з доставкою по всій Україні',
      description:
        salesPageData.translatedData[params.locale].meta.description ??
        'Акційне насіння з доставкою по Україні. Інтернет магазин продажу насіння.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
      type: 'website',
      url: currentUrl,
      images: [
        {
          url:
            salesPageData.translatedData[params.locale].meta.image ??
            `${config.NEXT_PUBLIC_APP_URL}/no-image.webp`,
          width: 1200,
          height: 630,
          alt: salesPageData.translatedData[params.locale].h1,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title:
        salesPageData.translatedData[params.locale].meta.title ??
        'Акційне насіння оптом та в роздріб з доставкою по всій Україні',
      description:
        salesPageData.translatedData[params.locale].meta.description ??
        'Акційне насіння з доставкою по Україні. Інтернет магазин продажу насіння.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
      images: [
        salesPageData.translatedData[params.locale].meta.image ??
          `${config.NEXT_PUBLIC_APP_URL}/no-image.webp`,
      ],
    },
  };
}

export default async function SalesPage({
  params,
  searchParams,
}: ISalesPageProps) {
  const salesPageData = await getPageDataByName('SalesPage');

  if (!salesPageData) {
    notFound();
  }

  const page = parseInt(searchParams.page || DEFAULT_PAGE);
  const limit = parseInt(searchParams.limit || PRODUCT_DISPLAY_LIMIT);

  const [{ products, paginationData }, { filters }, producers] =
    await Promise.all([
      getAllProductsByLabels(['top', 'sale'], page, limit, searchParams),
      getFiltersFromProducts(params.locale, {
        labels: { $in: ['top', 'sale'] },
      }),
      getProducersFromProducts(params.locale, {
        labels: { $in: ['top', 'sale'] },
      }),
    ]);

  return (
    <BreadCrumbsWrapper
      breadcrumbLinks={['', 'catalog', 'sales']}
      breadcrumbTitles={
        salesPageData.translatedData[params.locale].breadcrumbTitles
      }
    >
      <section>
        <Container>
          <div className='flex flex-col items-stretch gap-6 lg:flex-row lg:items-start'>
            <Filter filters={[producers, ...filters]} />
            <div className='basis-full flex flex-col gap-4'>
              <h1 className='text-center text-xl md:text-2xl mb-6 md:mb-8'>
                {salesPageData.translatedData[params.locale].h1}
              </h1>

              <ProductsList
                products={products}
                paginationData={paginationData}
              />
            </div>
          </div>
        </Container>
      </section>
    </BreadCrumbsWrapper>
  );
}
