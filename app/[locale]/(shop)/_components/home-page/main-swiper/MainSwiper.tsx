'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import MainSwiperButton from './MainSwiperButton';

export default function MainSwiper() {
  const [_, setSwiperInit] = useState<boolean>(false);

  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={{
        nextEl: nextButtonRef.current,
        prevEl: prevButtonRef.current,
      }}
      pagination={{
        bulletClass:
          'inline-block w-2 h-2 rounded-full bg-gray-300 mr-2 transition-all duration-300 hover:cursor-pointer',
        bulletActiveClass: 'bg-orange-500 w-3 h-3',
        clickable: true,
      }}
      loop={true}
      autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
      slidesPerView={1}
      onSwiper={_ => setSwiperInit(true)}
      wrapperClass='mainSwiper'
      wrapperTag='ul'
      className='rounded-md shadow-xl h-[250px] md:h-[400px] w-full lg:!w-[calc(100%_-_320px)] lg:!mr-0 lg:!ml-auto'
    >
      <MainSwiperButton to='next' btnRef={nextButtonRef} />
      <MainSwiperButton to='prev' btnRef={prevButtonRef} />

      <SwiperSlide tag='li'>
        <div className='relative h-full'>
          <Image
            alt='Cover on home page'
            src={'/promo1.png'}
            width={2000}
            height={900}
            priority
            className='absolute w-full h-full object-cover'
          />
          <div className='w-full h-full absolute z-[3] text-white flex flex-col items-center justify-center gap-6'>
            <p>text in slide</p>
            <button
              type='button'
              className='btn border-none bg-accent hover:bg-green-800'
            >
              button in slide
            </button>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide tag='li'>
        <div className='relative h-full'>
          <Image
            alt='Cover on home page'
            src={'/promo1.png'}
            width={2000}
            height={900}
            className='w-full h-full object-cover'
            priority
          />
        </div>
      </SwiperSlide>
      <SwiperSlide tag='li'>
        <div className='relative h-full'>
          <Image
            alt='Cover on home page'
            src={'/promo1.png'}
            width={2000}
            height={900}
            className='w-full h-full object-cover'
            priority
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
