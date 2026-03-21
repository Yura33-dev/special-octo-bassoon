'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { DEFAULT_IMAGE_PATH } from '@/lib/constants';

interface IProductImageProps {
  images: string[];
  alt: string;
}

export default function ProductImage({ images, alt }: IProductImageProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const validImages = images.length > 0 ? images : [DEFAULT_IMAGE_PATH];

  if (validImages.length === 1) {
    return (
      <div className='basis-1/2 lg:basis-1/3 flex justify-center items-start sm:justify-start'>
        <div className='max-w-[300px] sm:max-w-[400px]'>
          <Image
            className='w-full h-full object-cover rounded-md'
            src={validImages[0]}
            width={600}
            height={500}
            alt={alt}
          />
        </div>
      </div>
    );
  }

  return (
    <div className='basis-1/2 lg:basis-1/3 flex justify-center items-start sm:justify-start'>
      <div className='w-full sm:max-w-[400px] flex flex-col gap-3'>
        <div className='relative'>
          <Swiper
            className='h-[250px]  sm:h-[300px]'
            modules={[Navigation, Thumbs, FreeMode]}
            thumbs={{ swiper: thumbsSwiper }}
            loop={true}
            slidesPerView={1}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={swiper => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation !== 'boolean'
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
          >
            {validImages.map((src, index) => (
              <SwiperSlide key={index} className='h-full'>
                <div className='relative h-full rounded-md overflow-hidden'>
                  <Image
                    className='object-cover'
                    src={src}
                    fill
                    alt={`${alt} ${index + 1}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={prevRef}
            className='absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow transition-colors'
          >
            <ChevronLeft className='w-5 h-5 text-gray-700' />
          </button>
          <button
            ref={nextRef}
            className='absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-1 shadow transition-colors'
          >
            <ChevronRight className='w-5 h-5 text-gray-700' />
          </button>
        </div>

        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={8}
          slidesPerView={4}
          freeMode
          modules={[FreeMode, Navigation, Thumbs]}
          watchSlidesProgress
          className='h-14 sm:h-20 w-full'
        >
          {!isLoading &&
            validImages.map((src, index) => (
              <SwiperSlide key={index} className='h-full cursor-pointer'>
                <div className='relative h-full rounded-md overflow-hidden border-2 border-transparent [.swiper-slide-thumb-active_&]:border-primary transition-colors'>
                  <Image
                    src={src}
                    width={100}
                    height={100}
                    className='w-full h-full object-cover aspect-square'
                    alt={`${alt} мініатюра ${index + 1}`}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
