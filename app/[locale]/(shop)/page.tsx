import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPageDataByName } from '@/lib/api';
import { config } from '@/lib/config';
import { locale } from '@/types';

import HomePage from './_components/home-page/HomePage';

export async function generateMetadata({
  params,
}: IShopHomeProps): Promise<Metadata> {
  const locale = params?.locale ?? 'uk'; // 🔒 fallback

  const data = await getPageDataByName('MainPage');

  if (!data)
    return {
      title: 'Насіння оптом та в роздріб з доставкою по всій Україні',
      description:
        'Купити насіння з доставкою по Україні. Інтернет магазин продажу насіння ProGround.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
    };

  const translation = data.translatedData[locale];

  const currentUrl = `${config.NEXT_PUBLIC_APP_URL}/${locale}`;

  return {
    title:
      translation.meta.title ??
      'Насіння оптом та в роздріб з доставкою по всій Україні',
    metadataBase: new URL(config.NEXT_PUBLIC_APP_URL),

    alternates: {
      canonical: currentUrl,
      languages: {
        uk: `${config.NEXT_PUBLIC_APP_URL}/uk}`,
        ru: `${config.NEXT_PUBLIC_APP_URL}/ru}`,
        'x-default': `${config.NEXT_PUBLIC_APP_URL}/uk}`,
      },
    },

    other: {
      title:
        translation?.meta.title ??
        'Насіння оптом та в роздріб з доставкою по всій Україні',
      description:
        translation?.meta.description ??
        'Купити насіння з доставкою по Україні. Інтернет магазин продажу насіння ProGround.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
      keywords:
        translation?.meta.keywords ??
        'насіння, засоби захисту рослин, ProGround, інтернет-магазин насіння',
    },

    openGraph: {
      title: translation.meta.title,
      description: translation.meta.description,
      url: `/${locale}`,
      type: 'website',
      images: [
        {
          url: translation.meta.image,
          width: 1200,
          height: 630,
          alt: translation.meta.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: translation.meta.title,
      description: translation.meta.description,
      images: [translation.meta.image],
    },
  };
}

interface IShopHomeProps {
  params: {
    locale: locale;
  };
}

export default async function ShopHome({ params }: IShopHomeProps) {
  const locale = params?.locale ?? 'uk';
  const data = await getPageDataByName('MainPage');

  if (!data?.translatedData?.[locale]) {
    notFound();
  }

  return <HomePage dataPage={data} />;
}
