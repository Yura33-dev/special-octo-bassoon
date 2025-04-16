import { getLatestProducts } from '@/lib/api';

import NewProductsSwiperClient from './NewProductSwiperClient';

export default async function NewProductsSwiper() {
  const { products: latestProducts } = await getLatestProducts();

  return <NewProductsSwiperClient products={latestProducts} />;
}
