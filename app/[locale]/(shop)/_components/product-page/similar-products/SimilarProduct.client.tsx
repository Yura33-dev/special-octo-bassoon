'use client';

import { useRef, useState } from 'react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { IProductMapped } from '@/types';

import ProductSlide from '../../home-page/new-products-swiper/NewProductSlide';

interface ISimilarProductClientProps {
  products: IProductMapped[];
}

export default function SimilarProductClient({
  products,
}: ISimilarProductClientProps) {
  const [_, setIsSwiperInit] = useState<boolean>(false);

  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation={{
        nextEl: nextButtonRef.current,
        prevEl: prevButtonRef.current,
      }}
      autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
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
      {products.map(product => (
        <SwiperSlide key={product.id} tag='li'>
          <ProductSlide product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
