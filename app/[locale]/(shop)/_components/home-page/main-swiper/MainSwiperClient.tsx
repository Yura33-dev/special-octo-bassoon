'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Link } from '@/i18n/routing';
import { IFilteredSlide, ISlide } from '@/types';

import MainSwiperButton from './MainSwiperButton';

interface IMainSwiperClientProps {
  slides: Array<ISlide>;
}

export default function MainSwiperClient({ slides }: IMainSwiperClientProps) {
  const [_, setSwiperInit] = useState<boolean>(false);

  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);

  const filteredSlides = slides.filter(
    slide => slide.image && slide.name && slide.visible
  ) as unknown as Array<IFilteredSlide>;

  if (filteredSlides.length <= 0)
    return <div className='mt-[250px] lg:mt-[450px]'></div>;

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
      {filteredSlides.length > 1 && (
        <>
          <MainSwiperButton to='next' btnRef={nextButtonRef} />
          <MainSwiperButton to='prev' btnRef={prevButtonRef} />
        </>
      )}

      {filteredSlides.map(slide => (
        <SwiperSlide key={slide.id} tag='li'>
          {slide.linkTo ? (
            <Link href={slide.linkTo}>
              <div className='relative h-full'>
                <Image
                  alt={slide.name}
                  src={slide.image}
                  width={1000}
                  height={500}
                  className='w-full h-full object-cover'
                  priority
                />
              </div>
            </Link>
          ) : (
            <div className='relative h-full'>
              <Image
                alt={slide.name}
                src={slide.image}
                width={1000}
                height={500}
                className='w-full h-full object-cover'
                priority
              />
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
