'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Blocks,
  Factory,
  LayoutDashboard,
  Package,
  ShoppingCart,
  SlidersHorizontal,
  Wallet,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Link, usePathname } from '@/i18n/routing';

interface ISideBarProps {
  className?: string;
}

export default function SideBar({ className }: ISideBarProps) {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(true);
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const toggleSideBar = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (isOpen) {
      setIsMenuVisible(false);
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 150);
    } else {
      setIsOpen(true);
      timeoutRef.current = setTimeout(() => {
        setIsMenuVisible(true);
      }, 150);
    }
  };

  return (
    <motion.aside
      initial={{ width: 56 }}
      animate={{ width: isOpen ? 224 : 56 }}
      transition={{ duration: 0.2, ease: 'linear' }}
      className={clsx(
        className && className,
        'p-6',
        isOpen ? 'overflow-auto' : 'overflow-hidden'
      )}
    >
      <button
        onClick={toggleSideBar}
        className={clsx(
          'block border-primary border-[1px] rounded-md p-1 ml-auto mb-4 transition-all hover:bg-primary hover:text-white',
          isOpen ? 'translate-x-0' : '-translate-x-4'
        )}
        aria-label='Відкрити/закрити сайдбар'
      >
        {isOpen ? (
          <ArrowLeftFromLine
            className='w-5 h-5'
            focusable='false'
            aria-hidden='true'
          />
        ) : (
          <ArrowRightFromLine
            className='w-5 h-5'
            focusable='false'
            aria-hidden='true'
          />
        )}
      </button>

      <motion.ul
        initial={{ opacity: 0, pointerEvents: 'none' }}
        animate={{
          opacity: isMenuVisible ? 1 : 0,
          pointerEvents: isMenuVisible ? 'all' : 'none',
        }}
        transition={{ duration: 0.1, ease: 'linear' }}
        className={clsx('flex flex-col gap-2')}
      >
        <li>
          <Link
            href={'/dashboard'}
            className={clsx(
              'flex items-center justify-start gap-2 text-base transition-colors p-2 rounded-md hover:bg-primary-dark hover:text-white',
              pathname === '/dashboard' && 'bg-primary-dark text-white'
            )}
          >
            <LayoutDashboard className='w-5 h-5' />
            <span>Дашборд</span>
          </Link>
        </li>
        <li>
          <Link
            href={'/dashboard/categories'}
            className={clsx(
              'flex items-center justify-start gap-2 text-base transition-colors p-2 rounded-md hover:bg-primary-dark hover:text-white',
              pathname.includes('categories') && 'bg-primary-dark text-white'
            )}
          >
            <Blocks className='w-5 h-5' />
            <span>Категорії</span>
          </Link>
        </li>
        <li>
          <Link
            href={'/dashboard/packaging'}
            className={clsx(
              'flex items-center justify-start gap-2 text-base transition-colors p-2 rounded-md hover:bg-primary-dark hover:text-white',
              pathname.includes('packaging') && 'bg-primary-dark text-white'
            )}
          >
            <Package className='w-5 h-5' />
            <span>Пакування</span>
          </Link>
        </li>
        <li>
          <Link
            href={'/dashboard/products'}
            className={clsx(
              'flex items-center justify-start gap-2 text-base transition-colors p-2 rounded-md hover:bg-primary-dark hover:text-white',
              pathname.includes('products') && 'bg-primary-dark text-white'
            )}
          >
            <ShoppingCart className='w-5 h-5' />
            <span>Товари</span>
          </Link>
        </li>
        <li>
          <Link
            href={'/dashboard/filters'}
            className={clsx(
              'flex items-center justify-start gap-2 text-base transition-colors p-2 rounded-md hover:bg-primary-dark hover:text-white',
              pathname.includes('filters') && 'bg-primary-dark text-white'
            )}
          >
            <SlidersHorizontal className='w-5 h-5' />
            <span>Фільтри</span>
          </Link>
        </li>
        <li>
          <Link
            href={'/dashboard/producers'}
            className={clsx(
              'flex items-center justify-start gap-2 text-base transition-colors p-2 rounded-md hover:bg-primary-dark hover:text-white',
              pathname.includes('producers') && 'bg-primary-dark text-white'
            )}
          >
            <Factory className='w-5 h-5' />
            <span>Виробники</span>
          </Link>
        </li>
        <li>
          <Link
            href={'/dashboard/orders'}
            className={clsx(
              'flex items-center justify-start gap-2 text-base transition-colors p-2 rounded-md hover:bg-primary-dark hover:text-white',
              pathname.includes('orders') && 'bg-primary-dark text-white'
            )}
          >
            <Wallet className='w-5 h-5' />
            <span>Замовлення</span>
          </Link>
        </li>
      </motion.ul>
    </motion.aside>
  );
}
