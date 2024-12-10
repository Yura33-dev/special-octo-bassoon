'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import Link from 'next/link';

import NewProductsSwiperButton from './NewProductsSwiperButton';

export default function NewProductsSwiper() {
  const [_, setSwiperInit] = useState<boolean>(false);

  const nextButtonRef = useRef<HTMLButtonElement | null>(null);
  const prevButtonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <div className='flex justify-end items-center gap-4 absolute top-0 right-6'>
        <NewProductsSwiperButton to='prev' btnRef={prevButtonRef} />
        <NewProductsSwiperButton to='next' btnRef={nextButtonRef} />
      </div>

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
        onSwiper={_ => setSwiperInit(true)}
        wrapperTag='ul'
        className='!pb-5 !px-2'
      >
        <SwiperSlide
          tag='li'
          className='card bg-background shadow-lg min-h-[490px]'
        >
          <Link href='#' className='group'>
            <div className='relative h-[200px] rounded-md overflow-hidden'>
              <Image
                src='/tomat-cat.jpg'
                alt='Shoes'
                width={500}
                height={500}
                className='w-full h-full object-cover rounded-md'
              />
              <span
                className='badge h-auto w-auto px-2 py-1 rounded-md bg-accent border-none text-white text-base font-semibold absolute top-4 right-4
                            transition-colors duration-150 group-hover:bg-primary'
              >
                NEW
              </span>
            </div>
          </Link>
          <div className='card-body gap-0 p-4 '>
            <h3 className='text-xl font-semibold text-center mb-3 max-w-full truncate'>
              Томат Арома F1
            </h3>

            <p className='font-bold text-center text-xl mb-2'>1 099.63 грн</p>

            <span className='badge border-none bg-primary text-white text-xs mb-3 block mx-auto leading-relaxed'>
              500 насінин
            </span>
            <p className='text-center text-sm mb-3'>Оптом і в роздріб</p>

            <button className='btn bg-accent border-none text-foreground mb-5 hover:bg-primary hover:text-white uppercase text-base'>
              В кошик
            </button>

            <div className='card-actions justify-end'>
              <div className='rounded-badge px-2 leading-normal bg-orange-300 text-foreground text-xs border-none'>
                <Link href='#'>Насіння овочів</Link>
              </div>
              <div className='rounded-badge px-2 leading-normal bg-orange-300 text-foreground text-xs border-none'>
                <Link href='#'>Томат</Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide
          tag='li'
          className='card bg-background shadow-lg min-h-[490px]'
        >
          <Link href='#' className='group'>
            <div className='relative h-[200px] rounded-md overflow-hidden'>
              <Image
                src='/kukurudza-cat.jpg'
                alt='Shoes'
                width={500}
                height={500}
                className='w-full h-full object-cover rounded-md'
              />
              <span
                className='badge h-auto w-auto px-2 py-1 rounded-md bg-accent border-none text-white text-base font-semibold absolute top-4 right-4
                            transition-colors duration-150 group-hover:bg-primary'
              >
                NEW
              </span>
            </div>
          </Link>
          <div className='card-body gap-0 p-4 '>
            <h3 className='text-xl font-semibold text-center mb-3 max-w-full truncate'>
              Кукурудза цукрова Форвард F1 (1709)
            </h3>

            <p className='font-bold text-center text-xl mb-2'>16 164.25 грн</p>

            <span className='badge border-none bg-primary text-white text-xs mb-3 block mx-auto leading-relaxed'>
              25 000 насінин
            </span>
            <p className='text-center text-sm mb-3'>Оптом і в роздріб</p>

            <button className='btn bg-accent border-none text-foreground mb-5 hover:bg-primary hover:text-white uppercase text-base'>
              В кошик
            </button>

            <div className='card-actions justify-end'>
              <div className='rounded-badge px-2 leading-normal bg-orange-300 text-foreground text-xs border-none'>
                <Link href='#'>Насіння овочів</Link>
              </div>
              <div className='rounded-badge px-2 leading-normal bg-orange-300 text-foreground text-xs border-none'>
                <Link href='#'>Кукурудза суперсолодка</Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide
          tag='li'
          className='card bg-background shadow-lg min-h-[490px]'
        >
          <Link href='#' className='group'>
            <div className='relative h-[200px] rounded-md overflow-hidden'>
              <Image
                src='/ogirok-cat.jpg'
                alt='ogirok'
                width={500}
                height={500}
                className='w-full h-full object-cover'
              />
              <span
                className='badge h-auto w-auto px-2 py-1 rounded-md bg-accent border-none text-white text-base font-semibold absolute top-4 right-4
                            transition-colors duration-150 group-hover:bg-primary'
              >
                NEW
              </span>
            </div>
          </Link>
          <div className='card-body gap-0 p-4 '>
            <h3 className='text-xl font-semibold text-center mb-3 max-w-full truncate'>
              Огірок Бетіна F1
            </h3>

            <p className='font-bold text-center text-xl mb-2'>1 112.28 грн</p>

            <span className='badge border-none bg-primary text-white text-xs mb-3 block mx-auto leading-relaxed'>
              500 насінин
            </span>
            <p className='text-center text-sm mb-3'>Оптом і в роздріб</p>

            <button className='btn bg-accent border-none text-foreground mb-5 hover:bg-primary hover:text-white uppercase text-base'>
              В кошик
            </button>

            <div className='card-actions justify-end'>
              <div className='rounded-badge px-2 leading-normal bg-orange-300 text-foreground text-xs border-none'>
                <Link href='#'>Насіння овочів</Link>
              </div>
              <div className='rounded-badge px-2 leading-normal bg-orange-300 text-foreground text-xs border-none'>
                <Link href='#'>Огірок</Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide
          tag='li'
          className='card bg-background shadow-lg min-h-[490px]'
        >
          <Link href='#' className='group'>
            <div className='relative h-[200px] rounded-md overflow-hidden'>
              <Image
                src='/soniashnik-cat.jpg'
                alt='Shoes'
                width={500}
                height={500}
                className='w-full h-full object-cover rounded-md'
              />
              <span
                className='badge h-auto w-auto px-2 py-1 rounded-md bg-accent border-none text-white text-base font-semibold absolute top-4 right-4
                            transition-colors duration-150 group-hover:bg-primary'
              >
                NEW
              </span>
            </div>
          </Link>
          <div className='card-body gap-0 p-4 '>
            <h3 className='text-xl font-semibold text-center mb-3 max-w-full truncate'>
              Соняшник P64LP130 (П64ЛП130)
            </h3>

            <p className='font-bold text-center text-xl mb-2'>6 630.00 грн</p>

            <span className='badge border-none bg-primary text-white text-xs mb-3 block mx-auto leading-relaxed'>
              150 000 насінин
            </span>
            <p className='text-center text-sm mb-3'>Оптом і в роздріб</p>

            <button className='btn bg-accent border-none text-foreground mb-5 hover:bg-primary hover:text-white uppercase text-base'>
              В кошик
            </button>

            <div className='card-actions justify-end'>
              <div className='rounded-badge px-2 leading-normal bg-orange-300 text-foreground text-xs border-none'>
                <Link href='#'>Культури</Link>
              </div>
              <div className='rounded-badge px-2 leading-normal bg-orange-300 text-foreground text-xs border-none'>
                <Link href='#'>Соняшник</Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide
          tag='li'
          className='card bg-background shadow-lg min-h-[490px]'
        >
          <Link href='#' className='group'>
            <div className='relative h-[200px] rounded-md overflow-hidden'>
              <Image
                src='/tomat-cat.jpg'
                alt='Shoes'
                width={500}
                height={500}
                className='w-full h-full object-cover rounded-md'
              />
              <span
                className='badge h-auto w-auto px-2 py-1 rounded-md bg-accent border-none text-white text-base font-semibold absolute top-4 right-4
                            transition-colors duration-150 group-hover:bg-primary'
              >
                NEW
              </span>
            </div>
          </Link>
          <div className='card-body gap-0 p-4 '>
            <h3 className='text-xl font-semibold text-center mb-3 max-w-full truncate'>
              Кріп Брум F1
            </h3>

            <p className='font-bold text-center text-xl mb-2'>374.75 грн</p>

            <span className='badge border-none bg-primary text-white text-xs mb-3 block mx-auto leading-relaxed'>
              500 насінин
            </span>
            <p className='text-center text-sm mb-3'>Оптом і в роздріб</p>

            <button className='btn bg-accent border-none text-foreground mb-5 hover:bg-primary hover:text-white uppercase text-base'>
              В кошик
            </button>

            <div className='card-actions justify-end'>
              <div className='rounded-badge px-2 leading-normal bg-orange-300 text-foreground text-xs border-none truncate'>
                <Link href='#'>Добрива та стимулятори росту</Link>
              </div>
              <div className='rounded-badge px-2 leading-normal bg-orange-300 text-foreground text-xs border-none'>
                <Link href='#'>Родентицид</Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
