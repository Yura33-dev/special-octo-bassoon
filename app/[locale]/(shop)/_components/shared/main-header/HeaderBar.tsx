import Link from 'next/link';

import Container from '@/components/shared/Container';

import CartBtn from '../../ui/CartBtn';
import HamburgerBtn from '../../ui/HamburgerBtn';
import Logo from '../../ui/Logo';
import Cart from '../cart/Cart';

// TODO: get data from database
const HeaderData = [
  { href: '/pro-graund-a', text: 'Про нас' },
  { href: '/blog', text: 'Блог' },
  { href: '/porivnannia-tovariv', text: 'Порівняння товарів' },
];

export default function HeaderBar() {
  return (
    <div className='bg-primary py-2 fixed w-full top-0 left-0 z-10 shadow-sm'>
      <Container className='text-primary-foreground flex flex-col'>
        <div className='flex items-center'>
          <div className='flex gap-10 lg:gap-28 items-center basis-full'>
            <Logo className='text-2xl py-3' />

            <ul className='flex items-center gap-2'>
              {HeaderData.map(({ href, text }, index) => (
                <li
                  key={index}
                  className='hidden lg:flex text-base text-white font-medium '
                >
                  <Link
                    href={href}
                    className="p-2 ring-offset-background
                        focus-visible:outline-none focus-visible:ring-0 relative
                        before:content-[''] before:absolute before:bottom-1 before:left-1/2 before:translate-x-[-50%] before:w-full
                        before:h-[2px] before:bg-accent  before:max-w-0 before:transition-[max-width]
                       
                        hover:before:max-w-[calc(100%-16px)]
                        focus-visible:before:max-w-[calc(100%-16px)]"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <ul className='flex justify-end items-center gap-5'>
            <li>
              <CartBtn />
            </li>
            <li className='lg:hidden relative'>
              <HamburgerBtn />
            </li>
          </ul>
        </div>

        <div className='w-full relative'>
          <Cart />
        </div>
      </Container>
    </div>
  );
}
