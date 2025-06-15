import { notFound } from 'next/navigation';

import Container from '@/components/shared/Container';
import { getOrderById } from '@/lib/api';

import BackButton from '../../shared/BackButton';
import PageMainHeader from '../../shared/page-elements/PageMainHeader';
import OrderForm from '../forms/OrderForm';
import ArchiveOrderModal from '../modals/ArchiveOrderModal';

interface IEditOrderPageProps {
  orderId: string;
}

export default async function EditOrderPage({ orderId }: IEditOrderPageProps) {
  const order = await getOrderById(orderId);

  if (!order) notFound();

  return (
    <section>
      <Container>
        <BackButton title='Всі замовлення' href='/dashboard/orders' />
        <PageMainHeader title='Редагувати замовлення' className='mb-8' />

        <OrderForm order={order} />
        <ArchiveOrderModal orderId={order.id} orderNumber={order.orderNumber} />
      </Container>
    </section>
  );
}
