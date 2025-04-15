import { Metadata } from 'next';
import { Suspense } from 'react';

import { getProductBySlug } from '@/lib/api';
import { IProductMapped, locale } from '@/types';

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
  const product = await getProductBySlug(
    params.productSlug,
    params.locale as locale
  );

  if (!product) return { title: 'Proground | Сталася помилка' };

  const mappedProduct = product as IProductMapped;

  return {
    title: `ProGround | Редагування ${mappedProduct.translatedData[params.locale].name}`,
  };
}

export default function Page({ params }: IPageProps) {
  return (
    <Suspense fallback={<EditProductPageSkeleton />}>
      <EditProductPage productSlug={params.productSlug} />
    </Suspense>
  );
}
