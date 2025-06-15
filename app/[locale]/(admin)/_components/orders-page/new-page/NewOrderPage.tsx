import Container from '@/components/shared/Container';

import PageMainHeader from '../../shared/page-elements/PageMainHeader';
import OrderForm from '../forms/OrderForm';

export default function NewOrderPage() {
  return (
    <section>
      <Container>
        <PageMainHeader title='Додати замовлення' className='mb-8' />
        <OrderForm isAddForm />
      </Container>
    </section>
  );
}
