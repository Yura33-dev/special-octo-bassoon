'use client';

import { IMappedNestedCategories } from '@/types';

import NestedCategoriesList from './NestedCategoriesList';

interface INestedCategoriesProps {
  category: IMappedNestedCategories;
}

export default function NestedCategories({ category }: INestedCategoriesProps) {
  return (
    <div className='mt-10'>
      <h2 className='text-2xl font-semibold mb-4'>
        {category.main ? 'Дочірні категорії' : 'Батьківські категорії'}
      </h2>
      {category.main ? (
        <NestedCategoriesList
          subcategories={category.childCategories}
          main={category.main}
          baseCategoryId={category._id}
        />
      ) : (
        <NestedCategoriesList
          subcategories={category.parentCategories}
          main={category.main}
          baseCategoryId={category._id}
        />
      )}
    </div>
  );
}
