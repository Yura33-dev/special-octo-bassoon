import Container from '@/components/shared/Container';

import PageMainHeader from '../../shared/page-elements/PageMainHeader';
import CategoryForm from '../forms/CategoryForm';

export default function NewCategoryPage() {
  return (
    <section>
      <Container>
        <PageMainHeader title='Додати нову категорію' className='mb-8' />

        <CategoryForm isAddForm />
      </Container>
    </section>
  );
}
