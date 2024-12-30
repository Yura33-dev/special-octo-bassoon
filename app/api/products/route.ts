import { NextResponse } from 'next/server';

import { getAllProducts } from '@/lib/api/products';
import { IPagination, IProduct, locale } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') || '1');
  const locale = searchParams.get('locale') as locale;

  const { products, paginationData } = await getAllProducts(page, locale);

  return NextResponse.json<{
    products: Array<IProduct>;
    paginationData: IPagination;
  }>({ products, paginationData });
}
