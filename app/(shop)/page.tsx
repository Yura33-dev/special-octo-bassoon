import Container from '@/components/shared/Container';
import MainSwiper from './_components/home-page/main-swiper/MainSwiper';
import GridCategories from './_components/home-page/catalog-categories/GridCategories';
import NewProductsSwiper from './_components/home-page/new-products-swiper/NewProductsSwiper';

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

      <section className='mt-20'>
        <Container>
          <h2 className='sr-only'>Категорії та продукти</h2>
          <GridCategories />
        </Container>
      </section>

      <section className='mt-20'>
        <Container className='relative'>
          <h2 className='text-3xl font-semibold mb-8'>Новинки</h2>
          <NewProductsSwiper />
        </Container>
      </section>
    </>
  );
}
