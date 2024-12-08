// interface IGridCategoriesProps {}

import Link from 'next/link';
// import Image from 'next/image';
import { ArrowDownRight } from 'lucide-react';

import data from './featuredCategories.json';

export default function GridCategories() {
  return (
    <ul
      className='grid grid-cols-1 auto-rows-[125px]
                  sm:grid-cols-2 sm:auto-rows-[160px]
                  md:grid-cols-3 md:auto-rows-[190px]
                  lg:grid-cols-5 lg:auto-rows-[220px] gap-2'
    >
      <li className='bg-white rounded-md shadow-md'>
        <Link
          href='#'
          className='group flex flex-col gap-4 relative h-full p-6'
        >
          <h3 className='text-2xl'>Наші продукти</h3>
          <span className='leading-tight text-base'>
            Перейти в каталог всіх продуктів
          </span>

          <ArrowDownRight
            className='w-14 h-14 absolute bottom-2 right-[10px] transition-all duration-150 stroke-accent opacity-70
                        md:group-hover:w-16 md:group-hover:h-16 md:group-hover:stroke-primary md:group-hover:opacity-100'
          />
        </Link>
      </li>

      {data.map(({ title, src }, index) => (
        <li
          key={index}
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          className='overflow-hidden relative rounded-md 
                    after:content-[""] after:absolute after:z-[2]  after:block after:w-full after:h-full 
                    after:duration-150 after:transition-colors after:bg-black/40 hover:after:bg-black/50'
        >
          <Link
            href='#'
            className='group flex w-full h-full justify-center items-end 
                      text-2xl font-bold text-white uppercase p-2 
                      absolute z-[3]'
          >
            <h3
              className='relative text-xl font-medium mb-3
                        after:content-[""] after:block after:w-full after:max-w-0 after:h-[2px] after:bg-accent after:transition-all
                      after:duration-150 after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 
                     group-hover:after:max-w-full'
            >
              {title}
            </h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
