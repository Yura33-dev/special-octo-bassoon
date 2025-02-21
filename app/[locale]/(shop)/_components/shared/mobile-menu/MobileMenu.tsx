'use client';

import clsx from 'clsx';
import { X } from 'lucide-react';

import LocaleSwitcher from '@/components/shared/LocaleSwitcher';
import { Link } from '@/i18n/routing';
import { useGlobalStore } from '@/providers/globalStore.provider';

import data from './categoriesData.json';
import Logo from '../../ui/Logo';

export default function MobileMenu() {
  const isMobileMenuOpen = useGlobalStore(state => state.isMobileMenuOpen);
  const closeMobileMenu = useGlobalStore(state => state.mobileMenuClose);

  return (
    <div
      className={clsx(
        'opacity-0 pointer-events-none fixed top-0 left-0 bg-black/60 z-[11] w-full h-full transition-all duration-200',
        isMobileMenuOpen && 'backdrop-blur-sm opacity-100 pointer-events-auto'
      )}
    >
      <div
        className={clsx(
          'absolute top-0 right-[-375px] p-6 w-full h-dvh max-w-[375px] bg-primary text-white transition-all duration-300 flex flex-col gap-12',
          isMobileMenuOpen && '!right-0'
        )}
      >
        <div>
          <div className='flex justify-between items-center'>
            <Logo className='text-xl' />

            <button
              type='button'
              className='block bg-primary-dark rounded-md py-2 px-3'
              onClick={closeMobileMenu}
            >
              <X className='w-7 h-7' />
            </button>
          </div>

          <div className='mt-6'>
            <LocaleSwitcher />
          </div>
        </div>

        <div className='flex flex-col basis-full justify-between'>
          <ul className='flex flex-col items-center gap-3 '>
            {data.categoriesData.map((category, index) => (
              <li key={index} className='w-max relative'>
                <Link href={category.href} className='flex p-1'>
                  {category.text}
                </Link>
              </li>
            ))}
          </ul>

          <ul className='text-center flex flex-col gap-2'>
            <li>
              <a href='tel:+380955130057'>+38 (095) 513-00-57</a>
            </li>
            <li>
              <a href='tel:+380504243406'>+38 (050) 424-34-06</a>
            </li>
            <li>
              <a href='tel:+380684866044'>+38 (068) 486-60-44</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
