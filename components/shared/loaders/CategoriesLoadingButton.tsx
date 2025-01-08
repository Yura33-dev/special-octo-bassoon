import { ChevronDown, LayoutList, LoaderCircle } from 'lucide-react';

export default function CategoriesLoadingButton() {
  return (
    <button
      className='p-4 w-full sm:max-w-[310px] bg-teal-800 text-white flex justify-between'
      disabled={true}
    >
      <div className='flex gap-2 '>
        <LayoutList />

        <span className='flex gap-12'>
          Каталог товарів <LoaderCircle className='animate-spin' />
        </span>
      </div>
      <ChevronDown />
    </button>
  );
}
