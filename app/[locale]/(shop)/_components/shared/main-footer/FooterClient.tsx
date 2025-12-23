'use client';

import { Clock, Copyright, Mail, MapPin, Phone } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import Container from '@/components/shared/Container';
import { Link } from '@/i18n/routing';
import { CLEAN_PHONE_REGEXP } from '@/lib/constants';
import { ICategoryMapped, ISettingsMapped, locale } from '@/types';

import Logo from '../../ui/Logo';

interface IFooterClientProps {
  settings: ISettingsMapped | undefined;
  categories: ICategoryMapped[];
}

export default function FooterClient({
  settings,
  categories,
}: IFooterClientProps) {
  const t = useTranslations('Footer');
  const locale = useLocale() as locale;

  return (
    <footer className='mt-20 bg-primary text-white py-8'>
      <Container>
        <div className='flex flex-col items-center mb-6 lg:mb-12'>
          <Logo className='text-2xl py-2' />
          <span className='text-sm'>
            {settings?.translatedData[locale].slogan}
          </span>
        </div>

        <div className='flex flex-col gap-8 sm:gap-0 sm:gap-x-4 sm:gap-y-6 sm:flex-row sm:flex-wrap sm:justify-between'>
          <ul className='flex flex-col items-center sm:items-start '>
            <li className='mb-3'>
              <h3 className='text-xl font-semibold'>{t('CategoriesTitle')}</h3>
            </li>
            {categories.map(category => (
              <li key={category.id} className='w-max relative'>
                <Link
                  href={`/catalog/${category.slug[locale]}`}
                  className='flex p-1  
                          after:content-[""] after:block after:w-full after:h-[2px] after:bg-accent after:absolute
                          after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:max-w-0 after:transition-all after:duration-150
                          hover:after:max-w-[calc(100%_-_8px)]'
                >
                  {category.name[locale]}
                </Link>
              </li>
            ))}
          </ul>

          <ul className='flex flex-col gap-y-2 items-center sm:items-start '>
            <li className='mb-3'>
              <h3 className='text-xl font-semibold'>{t('ContactsTitle')}</h3>
            </li>
            {settings?.contacts.phones.map((phone, index) => (
              <li key={index} className='p-1'>
                <div className='flex gap-2 justify-start items-center relative w-max mx-auto sm:mx-0'>
                  <Phone className='w-4 h-4' />
                  <Link
                    href={`tel:${phone[0].replace(CLEAN_PHONE_REGEXP, '')}`}
                    className='after:content-[""] after:block after:w-full after:h-[2px] after:bg-accent after:absolute
                  after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:max-w-0 after:transition-all after:duration-150
                  hover:after:max-w-[calc(100%_-_8px)]'
                  >
                    {phone[0]}
                  </Link>
                </div>
                <span className='block text-center md:text-left text-xs max-w-60 sm:max-w-max'>
                  {phone[1]}
                </span>
              </li>
            ))}

            <li className='p-1 flex gap-2 justify-start items-center relative w-max'>
              <Mail className='w-4 h-4' />
              <Link
                href={`mailto:${settings?.contacts.email}`}
                className='after:content-[""] after:block after:w-full after:h-[2px] after:bg-accent after:absolute
                          after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:max-w-0 after:transition-all after:duration-150
                          hover:after:max-w-[calc(100%_-_8px)]'
              >
                {settings?.contacts.email}
              </Link>
            </li>
          </ul>

          {/* <ul className='flex flex-col items-center sm:items-start '>
            <li className='mb-3'>
              <h3 className='text-xl font-semibold'>{t('CustomersTitle')}</h3>
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
          </ul> */}

          <ul className='flex flex-col items-center sm:items-start '>
            <li className='mb-3'>
              <h3 className='text-xl font-semibold'>{t('WorkSchedule')}</h3>
            </li>
            <li className='p-1 flex gap-2 justify-start items-center'>
              <Clock className='w-4 h-4' />
              {
                settings?.translatedData[locale].workSchedule.workDays
              } <br />{' '}
              {settings?.translatedData[locale].workSchedule.weekendDays}
            </li>
            <li className='p-1 flex gap-2 justify-start items-center'>
              <MapPin className='w-4 h-4' />
              {settings?.translatedData[locale].location}
            </li>
            <li className='p-1 text-sm'>
              <span>{settings?.translatedData[locale].FOP.title}</span>
              <br />
              <span>{settings?.translatedData[locale].FOP.code}</span>
            </li>
          </ul>
        </div>

        <div className='flex justify-center items-center gap-2 mt-10'>
          <Copyright className='w-3 h-3' />
          <p>ProGround {new Date().getFullYear()}</p>
        </div>
      </Container>
    </footer>
  );
}
