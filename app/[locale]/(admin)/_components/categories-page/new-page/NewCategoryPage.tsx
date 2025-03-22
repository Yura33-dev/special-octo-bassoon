import Container from '@/components/shared/Container';

import PageMainHeader from '../../shared/page-elements/PageMainHeader';
import CategoryAddForm from '../forms/CategoryAddForm';

export default function NewCategoryPage() {
  return (
    <section>
      <Container>
        <PageMainHeader title='Додати нову категорію' className='mb-8' />

        <CategoryAddForm />
      </Container>
    </section>
  );
}
