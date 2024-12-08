import Container from '@/components/shared/Container';
import MainSwiper from './_components/home-page/main-swiper/MainSwiper';
import GridCategories from './_components/home-page/catalog-categories/GridCategories';

export default function ShopHome() {
  return (
    <>
      <h1 className='sr-only'>
        Ground-A - найкращий магазин насінин в Україні
      </h1>

      <section className='mt-4'>
        <Container>
          <MainSwiper />
        </Container>
      </section>

      <section className='mt-14'>
        <Container>
          <h2 className='sr-only'>Категорії та продукти</h2>
          <GridCategories />
        </Container>
      </section>
    </>
  );
}
