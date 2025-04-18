import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getPageDataByName } from '@/lib/api';
import { locale } from '@/types';

import HomePage from './_components/home-page/HomePage';

// TODO: add SEO images in OG
export async function generateMetadata({
  params,
}: IShopHomeProps): Promise<Metadata> {
  const data = await getPageDataByName('MainPage');

  if (!data)
    return {
      title: 'Насіння оптом та в роздріб з доставкою по всій Україні',
      description:
        'Купити насіння з доставкою по Україні. Інтернет магазин продажу насіння.✔️Гарантія якості ✔️Вигідні ціни ✔️Швидка доставка',
    };

  return {
    title: data.translatedData[params.locale].meta.title,
    description: data.translatedData[params.locale].meta.description,
    keywords: data.translatedData[params.locale].meta.keywords,

    openGraph: {
      title: data.translatedData[params.locale].meta.title,
      description: data.translatedData[params.locale].meta.description,
    },
  };
}

interface IShopHomeProps {
  params: {
    locale: locale;
  };
}

export default async function ShopHome() {
  const data = await getPageDataByName('MainPage');

  if (!data) {
    notFound();
  }

  // TODO: loading...
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage dataPage={data} />
    </Suspense>
  );
}
