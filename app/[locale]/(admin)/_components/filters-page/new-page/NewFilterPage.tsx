import Container from '@/components/shared/Container';

import PageMainHeader from '../../shared/page-elements/PageMainHeader';
import FilterAddForm from '../forms/FilterAddForm';

export default function NewFilterPage() {
  return (
    <Container>
      <PageMainHeader title='Додати новий фільтр' className='mb-8' />

      <FilterAddForm />
    </Container>
  );
}
