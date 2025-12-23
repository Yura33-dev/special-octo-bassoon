'use client';

import clsx from 'clsx';
import { X } from 'lucide-react';
import { useLocale } from 'next-intl';

import LocaleSwitcher from '@/components/shared/LocaleSwitcher';
import { Link, usePathname } from '@/i18n/routing';
import { CLEAN_PHONE_REGEXP } from '@/lib/constants';
import { useGlobalStore } from '@/providers/globalStore.provider';
import { ICategoryMapped, ISettingsMapped } from '@/types';

import Logo from '../../ui/Logo';

interface IMobileMenuClientProps {
  categories: Array<ICategoryMapped>;
  settings: ISettingsMapped | undefined;
}

export default function MobileMenuClient({
  categories,
  settings,
}: IMobileMenuClientProps) {
  const isMobileMenuOpen = useGlobalStore(state => state.isMobileMenuOpen);
  const closeMobileMenu = useGlobalStore(state => state.mobileMenuClose);
  const locale = useLocale();

  const pathName = usePathname();

  const handleClick = () => {
    closeMobileMenu();
  };

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
          <ul className='flex flex-col items-center gap-2 '>
            {categories.map(category => (
              <li
                key={category.id}
                className={clsx(
                  'w-max relative p-1 rounded-md',
                  pathName.includes(category.slug[locale]) && 'bg-primary-dark'
                )}
              >
                <Link
                  href={`/catalog/${category.slug[locale]}`}
                  className='flex p-1'
                  onClick={handleClick}
                >
                  {category.name[locale]}
                </Link>
              </li>
            ))}
          </ul>

          {settings && settings.contacts.phones.length > 0 && (
            <ul className='text-center flex flex-col gap-2'>
              {settings.contacts.phones.map((phone, index) => (
                <li key={index}>
                  <Link
                    href={`tel:${phone[0].replace(CLEAN_PHONE_REGEXP, '')}`}
                  >
                    {phone[0]}
                  </Link>

                  <span className='block text-sm'>{phone[1]}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
