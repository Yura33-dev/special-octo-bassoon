import { ChevronDown, LayoutList } from 'lucide-react';

import { usePathname } from '@/i18n/routing';

interface CatalogNavBarButton {
  toggleCategoriesList: () => void;
}

export default function CatalogNavBarButton({
  toggleCategoriesList,
}: CatalogNavBarButton) {
  const pathName = usePathname();

  return (
    <button
      className='p-4 w-full sm:max-w-[310px] bg-green-700 text-white flex justify-between'
      onClick={toggleCategoriesList}
      disabled={pathName === '/' ? true : false}
    >
      <div className='flex gap-2 '>
        <LayoutList />
        <span>Каталог товарів</span>
      </div>
      <ChevronDown />
    </button>
  );
}
