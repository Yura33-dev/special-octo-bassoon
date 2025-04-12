import Container from '@/components/shared/Container';

import PageMainHeader from '../../shared/page-elements/PageMainHeader';
import ProducerForm from '../forms/ProducerForm';

export default function NewProducerPage() {
  return (
    <section>
      <Container>
        <PageMainHeader title='Додати виробника' className='mb-8' />
        <ProducerForm isAddForm />
      </Container>
    </section>
  );
}
