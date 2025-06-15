import Container from '@/components/shared/Container';

import PageMainHeader from '../../shared/page-elements/PageMainHeader';
import BannersForm from '../forms/BannersForm';

export default function NewBannerPage() {
  return (
    <section>
      <Container>
        <PageMainHeader title='Додати новий банер' className='mb-8' />

        <BannersForm isAddForm />
      </Container>
    </section>
  );
}
