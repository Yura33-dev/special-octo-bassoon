import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

import Container from '@/components/shared/Container';

import data from './categoriesData.json';

export default function NavigationBar() {
  return (
    <div className='bg-primary hidden lg:block'>
      <Container>
        <ul className='flex justify-center text-white text-sm [backface-visibility:hidden]'>
          {data.categoriesData.map(({ href, text, subcategories }, index) => (
            <li key={index} className='group relative'>
              <Link href={href} className='flex items-center p-2 gap-2'>
                <span>{text}</span>
                <span>
                  <ChevronDown
                    size={16}
                    className='transition-transform duration-150 group-hover:rotate-180'
                  />
                </span>
              </Link>

              {subcategories && subcategories.length > 0 && (
                <ul
                  className={clsx(
                    `absolute top-full w-[400px] shadow-md rounded-b-md bg-white text-foreground p-2 hidden`,
                    index === subcategories.length ? 'right-0' : 'left-0',
                    'group-hover:grid grid-cols-3 auto-rows-auto'
                  )}
                >
                  {subcategories.map(({ href, text }, index) => (
                    <li key={index} className=''>
                      <Link
                        href={href}
                        className='flex p-2 rounded-md transition-colors duration-150 hover:bg-accent hover:text-white
                                  '
                      >
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
