import { getAllProductsByCategoryId } from '@/lib/api';

import SimilarProductClient from './SimilarProduct.client';

interface ISimilarProductsProps {
  categoryId: string;
}

export default async function SimilarProducts({
  categoryId,
}: ISimilarProductsProps) {
  const { products } = await getAllProductsByCategoryId(categoryId, 1, 20);

  return <SimilarProductClient products={products} />;
}
