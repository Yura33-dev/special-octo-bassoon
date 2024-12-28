import { getAllProducts } from '@/lib/api/products';
import { locale } from '@/types';

import Card from './catalog-card/Card';

interface ICardListProps {
  locale: locale;
  page: number;
}

export default async function CatalogGrid({ locale, page }: ICardListProps) {
  const { products } = await getAllProducts(page, locale);

  return (
    <ul className='grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 xl:gap-6'>
      {products.map(product => (
        <Card key={product.id} product={product} />
      ))}
    </ul>
  );
}
