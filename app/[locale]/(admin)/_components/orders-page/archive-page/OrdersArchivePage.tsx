import Container from '@/components/shared/Container';
import { getAllOrders } from '@/lib/api';
import { DEFAULT_PAGE, ORDERS_DISPLAY_LIMIT } from '@/lib/constants';

import BackButton from '../../shared/BackButton';
import PageMainHeader from '../../shared/page-elements/PageMainHeader';
import OrdersList from '../OrdersList';

interface IOrdersArchivePageProps {
  searchParams: {
    page?: string;
    limit?: string;
    [key: string]: string | undefined;
  };
}

export default async function OrdersArchivePage({
  searchParams,
}: IOrdersArchivePageProps) {
  const page = parseInt(searchParams.page || DEFAULT_PAGE);
  const limit = parseInt(searchParams.limit || ORDERS_DISPLAY_LIMIT);

  const { orders, paginationData } = await getAllOrders(page, limit, {
    isArchive: true,
  });

  return (
    <section>
      <Container>
        <BackButton title='Діючі замовлення' href='/dashboard/orders' />
        <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center justify-between sm:gap-8'>
          <PageMainHeader title='Архів замовлень' length={orders.length} />
          <div className='flex gap-6'></div>
        </div>
        {orders.length > 0 ? (
          <OrdersList orders={orders} paginationData={paginationData} />
        ) : (
          <h2 className='basis-full text-base mt-4'>
            Архів замовлень порожній
          </h2>
        )}
      </Container>
    </section>
  );
}
