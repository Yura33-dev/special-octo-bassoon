'use client';

import { useRef, useState } from 'react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { IProductMapped } from '@/types';

import NewProductSlide from './NewProductSlide';
import NewProductSlideSkeletons from './NewProductSlideSkeleton';
import NewProductsSwiperButton from './NewProductsSwiperButton';

interface INewProductsSwiperClientProps {
  products: Array<IProductMapped>;
}

export default function NewProductsSwiperClient({
  products,
}: INewProductsSwiperClientProps) {
  const [isSwiperInit, setIsSwiperInit] = useState<boolean>(false);

  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      {isSwiperInit && (
        <div className='flex justify-end items-center gap-4 absolute top-0 right-6'>
          <NewProductsSwiperButton to='prev' btnRef={prevButtonRef} />
          <NewProductsSwiperButton to='next' btnRef={nextButtonRef} />
        </div>
      )}

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: nextButtonRef.current,
          prevEl: prevButtonRef.current,
        }}
        autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
        pagination={{
          bulletClass:
            'inline-block w-2 h-2 rounded-full bg-gray-300 mr-2 transition-all duration-300 hover:cursor-pointer',
          bulletActiveClass: 'bg-orange-500 w-3 h-3',
          clickable: true,
        }}
        loop={true}
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          450: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          800: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        onSwiper={_ => setIsSwiperInit(true)}
        wrapperTag='ul'
        className='!pb-5 !px-2 !overflow-visible !overflow-x-clip !overflow-y-visible'
      >
        {!isSwiperInit && <NewProductSlideSkeletons />}

        {isSwiperInit &&
          products.map(product => (
            <SwiperSlide
              key={product.id}
              tag='li'
              className='card bg-background'
            >
              <NewProductSlide product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
