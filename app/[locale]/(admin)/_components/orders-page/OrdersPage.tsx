import { Archive } from 'lucide-react';

import Container from '@/components/shared/Container';
import { Link } from '@/i18n/routing';
import { getAllOrders } from '@/lib/api';
import {
  ADD_ORDER_ID,
  DEFAULT_PAGE,
  ORDERS_DISPLAY_LIMIT,
} from '@/lib/constants';

import OrdersList from './OrdersList';
import AddButton from '../shared/AddButton';
import PageMainHeader from '../shared/page-elements/PageMainHeader';

interface IOrdersPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    [key: string]: string | undefined;
  };
}

export default async function OrdersPage({ searchParams }: IOrdersPageProps) {
  const page = parseInt(searchParams.page || DEFAULT_PAGE);
  const limit = parseInt(searchParams.limit || ORDERS_DISPLAY_LIMIT);

  const { orders, paginationData } = await getAllOrders(page, limit, {
    isArchive: false,
  });

  return (
    <section>
      <Container>
        <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center justify-between sm:gap-8'>
          <PageMainHeader title='Замовлення' length={orders.length} />
          <div className='flex gap-6'>
            <AddButton
              type='link'
              modalId={ADD_ORDER_ID}
              href='/dashboard/orders/new'
            />
            <Link
              href='/dashboard/orders/archive'
              type='button'
              className='text-sm p-2 bg-primary rounded-md font-semibold flex items-center gap-3 justify-center transition-colors hover:bg-primary-dark text-white'
            >
              <span>Архів замовлень</span>
              <Archive className='w-5 h-5' aria-hidden focusable='false' />
            </Link>
          </div>
        </div>
        {orders.length > 0 ? (
          <OrdersList orders={orders} paginationData={paginationData} />
        ) : (
          <h2 className='basis-full text-base'>
            Список замовлень порожній. Спробуйте змінити фільтри для пошуку
          </h2>
        )}
      </Container>
    </section>
  );
}
