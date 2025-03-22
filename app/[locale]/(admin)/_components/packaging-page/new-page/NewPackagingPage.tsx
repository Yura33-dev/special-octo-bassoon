import Container from '@/components/shared/Container';

import PageMainHeader from '../../shared/page-elements/PageMainHeader';
import PackAddForm from '../forms/PackAddForm';

export default function NewPackagingPage() {
  return (
    <Container>
      <PageMainHeader title='Додати нове пакування' className='mb-8' />
      <PackAddForm />
    </Container>
  );
}
