'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import CircleLoader from '@/components/shared/loaders/CircleLoader';
import { addNestedCategory } from '@/lib/api';
import { ICategoryMapped, locale } from '@/types';

interface ISubcategoriesListProps {
  availableSubcategories: Array<ICategoryMapped>;
  baseCategoryId: string;
  main: boolean;
}

export default function SubcategoriesList({
  availableSubcategories,
  baseCategoryId,
  main,
}: ISubcategoriesListProps) {
  const locale = useLocale() as locale;

  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);

  const sortedCategories = availableSubcategories.toSorted((a, b) =>
    a.name[locale].localeCompare(b.name[locale])
  );

  const handleAddCategoryInNested = async (
    categoryId: string,
    baseCategoryId: string
  ) => {
    setIsSubmitting(categoryId);

    try {
      await addNestedCategory(categoryId, baseCategoryId, main);
      toast.success('Категорія успішно оновлена!');
    } catch (error: unknown) {
      console.error(error);
      toast.error('Помилка при оновленні категорії. Спробуйте ще раз');
    } finally {
      setIsSubmitting(null);
    }
  };

  return (
    <ul className='flex flex-col gap-4 text-foreground'>
      {sortedCategories.map(category => (
        <li
          key={category.id}
          className='p-2 bg-teal-700/30 rounded-md flex items-center justify-between gap-2 '
        >
          <div className='flex items-center gap-2'>
            <div className='w-16 h-16'>
              <Image
                src={category.image || '/no-image.webp'}
                width={100}
                height={100}
                alt={'Іконка підкатегорії'}
                className='w-full h-full object-cover rounded-md'
              />
            </div>
            <h3>{category.name[locale]}</h3>
          </div>
          <button
            type='button'
            className='bg-primary w-24 h-9 flex justify-center items-center rounded-md text-white text-sm transition-colors hover:bg-primary-dark
                      disabled:bg-gray-400/60 disabled:cursor-not-allowed'
            onClick={() =>
              handleAddCategoryInNested(category.id, baseCategoryId)
            }
            disabled={!!isSubmitting}
          >
            {isSubmitting === category.id ? (
              <CircleLoader className='w-5 h-5 border-primary' />
            ) : (
              'Додати'
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}
