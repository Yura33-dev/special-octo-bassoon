import Container from '@/components/shared/Container';
import { getAllOrders } from '@/lib/api';

import OrdersList from './OrdersList';
import PageMainHeader from '../shared/page-elements/PageMainHeader';

// import AddButton from "../shared/AddButton";

export default async function OrdersPage() {
  const orders = await getAllOrders();

  return (
    <section>
      <Container>
        <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center justify-between sm:gap-8'>
          <PageMainHeader title='Замовлення' length={orders.length} />
          {/* <AddButton
              type='link'
              modalId={ADD_FILTER_ID}
              href='/dashboard/orders/new'
            /> */}
        </div>

        <OrdersList orders={orders} />
      </Container>
    </section>
  );
}
