import { ChevronDown, LayoutList } from 'lucide-react';

interface CatalogNavBarButton {
  toggleCategoriesList: () => void;
  isButtonDisabled: boolean;
}

export default function CatalogNavBarButton({
  toggleCategoriesList,
  isButtonDisabled,
}: CatalogNavBarButton) {
  return (
    <button
      className='p-4 w-full sm:max-w-[310px] bg-green-700 text-white flex justify-between'
      onClick={toggleCategoriesList}
      disabled={isButtonDisabled}
    >
      <div className='flex gap-2 '>
        <LayoutList />
        <span>Каталог товарів</span>
      </div>
      <ChevronDown />
    </button>
  );
}
