import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getPageDataByName } from '@/lib/api';
import { locale } from '@/types';

import HomePage from './_components/home-page/HomePage';

export default async function ShopHome({
  params: { locale },
}: {
  params: { locale: locale };
}) {
  const data = await getPageDataByName('MainPage', locale);

  if (!data) {
    notFound();
  }

  // TODO: add SEO header, description and tags

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage dataPage={data} />
    </Suspense>
  );
}
