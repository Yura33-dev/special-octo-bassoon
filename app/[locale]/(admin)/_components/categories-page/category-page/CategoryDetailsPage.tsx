import { notFound } from 'next/navigation';

import Container from '@/components/shared/Container';
import ModalWindow from '@/components/shared/modals/ModalWindow';
import { getAllCategories, getFullCategoryBySlug } from '@/lib/api';
import { ADD_SUBCATEGORY_ID, DELETE_CATEGORY_ID } from '@/lib/constants';
import { locale } from '@/types';

import NestedCategories from './NestedCategories';
import BackButton from '../../shared/BackButton';
import CategoryEditForm from '../forms/CategoryEditForm';
import CategoryDeleteModal from '../modals/CategoryDeleteModal';
import NestedCategoryAddModal from '../modals/NestedCategoryAddModal';

interface ICategoryPageProps {
  categorySlug: string;
  locale: locale;
}

export default async function CategoryDetailsPage({
  categorySlug,
  locale,
}: ICategoryPageProps) {
  const [category, categories] = await Promise.all([
    getFullCategoryBySlug(categorySlug, locale),
    getAllCategories(locale),
  ]);

  if (!category) {
    notFound();
  }

  const childCategoriesIds = new Set(
    category.childCategories.flatMap(child => child._id)
  );
  const parentCategoriesIds = new Set(
    category.parentCategories.flatMap(parent => parent._id)
  );

  const filteredArray = categories
    .filter(item => item.main === !category.main)
    .filter(item =>
      category.main
        ? !childCategoriesIds.has(item.id)
        : !parentCategoriesIds.has(item.id)
    );

  return (
    <section>
      <Container>
        <BackButton />
        <h1 className='text-2xl mb-10'>
          Редагування {category.main ? 'батьківської' : 'дочірньої'} категорії{' '}
          <span className='font-semibold'>{category.name[locale]}</span>
        </h1>

        <CategoryEditForm category={category} />

        <NestedCategories category={category} />

        <ModalWindow
          title='Підтвердження'
          modalId={DELETE_CATEGORY_ID}
          className='lg:max-w-[600px]'
        >
          <CategoryDeleteModal
            categoryId={category._id}
            categoryTitle={category.name[locale]}
          />
        </ModalWindow>

        <ModalWindow
          title='Додати категорію'
          modalId={ADD_SUBCATEGORY_ID}
          className='lg:max-w-[500px]'
        >
          <NestedCategoryAddModal
            availableSubcategories={filteredArray}
            baseCategoryId={category._id}
            main={category.main}
          />
        </ModalWindow>
      </Container>
    </section>
  );
}
