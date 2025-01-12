'use client';

import { ChevronDown, LayoutList } from 'lucide-react';
import { useEffect, useState } from 'react';

import { usePathname } from '@/i18n/routing';
import { useMediaQuery } from '@/lib/hooks';
import { useGlobalStore } from '@/providers/globalStore.provider';

export default function CatalogNavBarButton() {
  const [isMounted, setIsMounted] = useState(false);

  const categoriesListToggle = useGlobalStore(
    state => state.categoriesListToggle
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isMobile = useMediaQuery('(max-width: 1024px)');
  const pathName = usePathname();

  const isDisabled = isMounted ? pathName === '/' && !isMobile : false;

  return (
    <button
      className='p-4 w-full sm:max-w-[310px] bg-teal-900 text-white flex justify-between relative'
      onClick={categoriesListToggle}
      disabled={isDisabled}
    >
      <div className='flex gap-2 '>
        <LayoutList />
        <span>Каталог товарів</span>
      </div>
      <ChevronDown />
    </button>
  );
}
