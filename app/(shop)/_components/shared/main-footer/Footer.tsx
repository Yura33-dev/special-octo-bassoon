import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

import Container from '@/components/shared/Container';

import data from './categoriesData.json';
import Logo from '../../ui/Logo';

export default function Footer() {
  return (
    <footer className='mt-20 bg-primary text-white py-8'>
      <Container>
        <div className='flex flex-col items-center mb-6 lg:mb-12'>
          <Logo title='Graund-A' className='text-2xl py-2' />
          <span className='text-sm'>Засій своє майбутнє з Graund-A!</span>
        </div>

        <div className='flex flex-col gap-8 sm:gap-0 sm:gap-x-4 sm:gap-y-6 sm:flex-row sm:flex-wrap sm:justify-between'>
          <ul className='flex flex-col items-center sm:items-start '>
            <li className='mb-3'>
              <h3 className='text-xl font-semibold'>Категорії</h3>
            </li>
            {data.categoriesData.map((category, index) => (
              <li key={index} className='w-max relative'>
                <Link
                  href={category.href}
                  className='flex p-1  
                          after:content-[""] after:block after:w-full after:h-[2px] after:bg-accent after:absolute
                          after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:max-w-0 after:transition-all after:duration-150
                          hover:after:max-w-[calc(100%_-_8px)]'
                >
                  {category.text}
                </Link>
              </li>
            ))}
          </ul>

          <ul className='flex flex-col items-center sm:items-start '>
            <li className='mb-3'>
              <h3 className='text-xl font-semibold'>Контакти</h3>
            </li>
            <li className='p-1 flex gap-2 justify-start items-center relative w-max'>
              <Phone className='w-4 h-4' />
              <a
                href='tel:+380955130057'
                className='after:content-[""] after:block after:w-full after:h-[2px] after:bg-accent after:absolute
                          after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:max-w-0 after:transition-all after:duration-150
                          hover:after:max-w-[calc(100%_-_8px)]'
              >
                +38 (095) 513-00-57
              </a>
            </li>
            <li className='p-1 flex gap-2 justify-start items-center relative w-max'>
              <Phone className='w-4 h-4' />
              <a
                href='tel:+380504243406'
                className='after:content-[""] after:block after:w-full after:h-[2px] after:bg-accent after:absolute
                          after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:max-w-0 after:transition-all after:duration-150
                          hover:after:max-w-[calc(100%_-_8px)]'
              >
                +38 (050) 424-34-06
              </a>
            </li>
            <li className='p-1 flex gap-2 justify-start items-center relative w-max'>
              <Phone className='w-4 h-4' />
              <a
                href='tel:+380684866044'
                className='after:content-[""] after:block after:w-full after:h-[2px] after:bg-accent after:absolute
                          after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:max-w-0 after:transition-all after:duration-150
                          hover:after:max-w-[calc(100%_-_8px)]'
              >
                +38 (068) 486-60-44
              </a>
            </li>
            <li className='p-1 flex gap-2 justify-start items-center relative w-max'>
              <Mail className='w-4 h-4' />
              <a
                href='mailto:graund.a@ukr.net'
                className='after:content-[""] after:block after:w-full after:h-[2px] after:bg-accent after:absolute
                          after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:max-w-0 after:transition-all after:duration-150
                          hover:after:max-w-[calc(100%_-_8px)]'
              >
                graund.a@ukr.net
              </a>
            </li>
          </ul>

          <ul className='flex flex-col items-center sm:items-start '>
            <li className='mb-3'>
              <h3 className='text-xl font-semibold'>Покупцям</h3>
            </li>
            <li className='p-1 flex gap-2 justify-start items-center relative w-max'>
              <Link
                href='#'
                className='after:content-[""] after:block after:w-full after:h-[2px] after:bg-accent after:absolute
                          after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:max-w-0 after:transition-all after:duration-150
                          hover:after:max-w-[calc(100%_-_8px)]'
              >
                Доставка та оплата
              </Link>
            </li>
            <li className='p-1 flex gap-2 justify-start items-center relative w-max'>
              <Link
                href='#'
                className='after:content-[""] after:block after:w-full after:h-[2px] after:bg-accent after:absolute
                          after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:max-w-0 after:transition-all after:duration-150
                          hover:after:max-w-[calc(100%_-_8px)]'
              >
                Гарантії
              </Link>
            </li>
            <li className='p-1 flex gap-2 justify-start items-center relative w-max'>
              <Link
                href='#'
                className='after:content-[""] after:block after:w-full after:h-[2px] after:bg-accent after:absolute
                          after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:max-w-0 after:transition-all after:duration-150
                          hover:after:max-w-[calc(100%_-_8px)]'
              >
                Повернення товару
              </Link>
            </li>
            <li className='p-1 flex gap-2 justify-start items-center relative w-max'>
              <Link
                href='#'
                className='after:content-[""] after:block after:w-full after:h-[2px] after:bg-accent after:absolute
                          after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:max-w-0 after:transition-all after:duration-150
                          hover:after:max-w-[calc(100%_-_8px)]'
              >
                Блог
              </Link>
            </li>
          </ul>

          <ul className='flex flex-col items-center sm:items-start '>
            <li className='mb-3'>
              <h3 className='text-xl font-semibold'>Графік роботи</h3>
            </li>
            <li className='p-1 flex gap-2 justify-start items-center'>
              <Clock className='w-4 h-4' />
              Пн-Пт: 09:00 - 18:00 <br /> Сб-Нд: Вихідні
            </li>
            <li className='p-1 flex gap-2 justify-start items-center'>
              <MapPin className='w-4 h-4' />
              Україна, Харків
            </li>
            <li className='p-1 text-sm'>
              ФО-П Вершкова О.О. <br /> ЄДРПОУ 3623003607
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
