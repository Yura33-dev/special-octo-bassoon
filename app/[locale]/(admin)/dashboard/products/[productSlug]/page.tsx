import { Metadata } from 'next';
import { Suspense } from 'react';

import { routing } from '@/i18n/routing';
import { getProductBySlug } from '@/lib/api';

import EditProductPage from '../../../_components/products-page/edit-page/EditProductPage';
import EditProductPageSkeleton from '../../../_components/products-page/edit-page/EditProductPageSkeleton';

interface IPageProps {
  params: {
    locale: string;
    productSlug: string;
  };
}

export async function generateMetadata({
  params,
}: IPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.productSlug, routing.locales);

  if (!product) return { title: 'Proground | Сталася помилка' };

  return {
    title: `ProGround | Редагування ${product.translatedData[params.locale].name}`,
  };
}

export default function Page({ params }: IPageProps) {
  return (
    <Suspense fallback={<EditProductPageSkeleton />}>
      <EditProductPage productSlug={params.productSlug} />
    </Suspense>
  );
}
