'use client';

import { CircleCheck, CircleX, Eye, EyeOff, Pencil } from 'lucide-react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';

import { Link } from '@/i18n/routing';
import { patchCategoryById } from '@/lib/api';
import { ICategoryMapped, locale } from '@/types';

import DropDownMenu from '../../shared/DropDownMenu';

interface IHeaderBodyProps {
  categories: Array<ICategoryMapped>;
}

export default function HeaderBody({ categories }: IHeaderBodyProps) {
  const locale = useLocale() as locale;

  const handleHideCategory = async (
    categoryId: string,
    categoryStatus: boolean
  ) => {
    try {
      await patchCategoryById(categoryId, { visible: !categoryStatus });
      toast.success('Категорія успішно оновлена!');
    } catch (error: unknown) {
      toast.error('Сталася помилка при оновлені категорії, спробуйте ще раз');
      console.error('Error occured while category hiding...', error);
    }
  };

  // const handleDeleteCategory = async (categoryId: string) => {
  //   try {
  //     await deleteCategoryById(categoryId);
  //     toast.success('Категорія успішно видалена!');
  //   } catch (error: unknown) {
  //     toast.error('Сталася помилка при видаленні категорії, спробуйте ще раз');
  //     console.error('Error occured while category deleting...', error);
  //   }
  // };

  return (
    <>
      {categories.map(category => (
        <li
          key={category.id}
          role='rowgroup'
          className='bg-teal-700/20 p-4 rounded-md'
        >
          <div role='row' className='flex gap-6 items-center'>
            <div role='cell' className='flex-shrink-0 flex-grow-0 basis-[70px]'>
              <div className='w-16 h-16'>
                <Image
                  src={
                    category.image === '' ? '/no-image.webp' : category.image
                  }
                  width={100}
                  height={100}
                  alt='Картина категорії'
                  className='w-full h-full object-cover rounded-md'
                />
              </div>
            </div>
            <div role='cell' className='flex-1 flex justify-center text-center'>
              {category.name[locale]}
            </div>
            <div role='cell' className='flex-1 flex justify-center'>
              {category.visible ? (
                <CircleCheck className='text-green-600' />
              ) : (
                <CircleX className='text-red-600' />
              )}
            </div>
            <div role='cell' className='flex-1 flex justify-center gap-2'>
              {category.main
                ? category.childCategories.length
                : category.parentCategories[0]?.name[locale] || (
                    <span className='italic'>Без категорії</span>
                  )}
              {category.parentCategories.length > 1 && (
                <span>(+{category.parentCategories.length - 1})</span>
              )}
            </div>

            <div role='cell' className='flex-1 flex justify-center relative'>
              <DropDownMenu>
                <li className='text-base transition-colors hover:bg-gray-200 rounded-md'>
                  <Link
                    href={`/dashboard/categories/${category.slug[locale]}`}
                    className='flex items-center gap-3 w-full p-2'
                  >
                    <Pencil className='w-4 h-4 text-gray-500' />
                    Редагувати
                  </Link>
                </li>

                <li className='text-base transition-colors hover:bg-gray-200 rounded-md'>
                  <button
                    className='flex items-center gap-3 w-full p-2'
                    onClick={() =>
                      handleHideCategory(category.id, category.visible)
                    }
                  >
                    {category.visible ? (
                      <>
                        <EyeOff className='w-4 h-4 text-gray-500' /> Сховати
                      </>
                    ) : (
                      <>
                        <Eye className='w-4 h-4 text-gray-500' />
                        Показати
                      </>
                    )}
                  </button>
                </li>

                {/* <li className='text-base transition-colors hover:bg-gray-200 rounded-md'>
                  <button
                    className='flex items-center gap-3 w-full p-2'
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <Trash className='w-4 h-4 text-red-500' />
                    Видалити
                  </button>
                </li> */}
              </DropDownMenu>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}
