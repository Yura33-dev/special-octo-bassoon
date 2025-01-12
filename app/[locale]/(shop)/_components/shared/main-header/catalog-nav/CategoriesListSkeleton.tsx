import { ChevronRight } from 'lucide-react';

import Container from '@/components/shared/Container';
import Skeleton from '@/components/shared/loaders/Skeleton';

import CatalogNavBarButton from './CatalogNavBarButton';

export default function CategoriesListSkeleton() {
  return (
    <Container className='relative'>
      <CatalogNavBarButton />

      <Skeleton
        icon={<ChevronRight size={16} className='animate-pulse' />}
        quantity={5}
        widths={['w-1/2', 'w-2/3', 'w-1/3', 'w-1/2', 'w-10/12']}
        wrapperStyle='h-[400px] flex-col space-y-5 p-5 w-full max-w-[95%] sm:w-[310px] bg-white rounded-md mt-4 absolute top-full hidden lg:flex'
        className='h-5'
      />
    </Container>
  );
}
