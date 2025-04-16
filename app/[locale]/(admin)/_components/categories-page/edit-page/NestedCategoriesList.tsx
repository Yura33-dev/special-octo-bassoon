'use client';

import { CirclePlus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';

import { Link } from '@/i18n/routing';
import { removeNestedCategory } from '@/lib/api';
import { ADD_SUBCATEGORY_ID } from '@/lib/constants';
import { useModalStore } from '@/providers';
import { ICategoryMapped, locale } from '@/types';

interface INestedCategoriesListProps {
  subcategories: Array<
    Omit<ICategoryMapped, 'childCategories' | 'parentCategories'>
  >;
  main: boolean;
  baseCategoryId: string;
}

export default function NestedCategoriesList({
  subcategories,
  main,
  baseCategoryId,
}: INestedCategoriesListProps) {
  const openModal = useModalStore(state => state.openModal);
  const locale = useLocale() as locale;

  const handleDeleteCategoryFromNested = async (
    categoryId: string,
    baseCategoryId: string
  ) => {
    try {
      await removeNestedCategory(categoryId, baseCategoryId, main);
      toast.success('Категорія успішно оновлена!');
    } catch (error: unknown) {
      toast.error('Помилка при оновленні категорії. Спробуйте ще раз');
      console.error(error);
    } finally {
    }
  };

  return (
    <ul className='grid auto-rows-[56px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
      {subcategories.map(category => (
        <li
          key={category.id}
          className='flex items-center justify-between p-1 transition-colors rounded-md bg-teal-700/30 hover:bg-teal-700/60
                        focus-within:bg-teal-700/60 focus-within:outline-none'
        >
          <Link
            href={`/dashboard/categories/${category.slug[locale]}`}
            className='basis-full focus-within:outline-none'
          >
            <div className='flex justify-between items-center gap-4'>
              <div className='flex gap-2 items-center'>
                <div className='w-12 h-12 shrink-0'>
                  <Image
                    src={category.image}
                    alt={`Зображення ${category.name[locale]}`}
                    width={100}
                    height={100}
                    className='w-full h-full object-cover rounded-md'
                  />
                </div>
                <h3 className='text-sm'>{category.name[locale]}</h3>
              </div>
            </div>
          </Link>

          <button
            type='button'
            onClick={() =>
              handleDeleteCategoryFromNested(category.id, baseCategoryId)
            }
            className='rounded-md bg-primary text-white p-2 transition-all hover:bg-primary-dark active:scale-90
                          focus-within:outline-none focus-within:ring-2 ring-primary-dark'
          >
            <Trash2 className='w-4 h-4' />
          </button>
        </li>
      ))}

      <li className='p-1 rounded-md bg-teal-700/30 transition-colors hover:bg-teal-700/70 hover:text-white hover:cursor-pointer'>
        <button
          type='button'
          className='flex justify-center items-center w-full h-full gap-2'
          onClick={() => openModal(ADD_SUBCATEGORY_ID)}
        >
          <CirclePlus className='w-6 h-6' />
        </button>
      </li>
    </ul>
  );
}
