import { notFound } from 'next/navigation';

import Container from '@/components/shared/Container';
import { routing } from '@/i18n/routing';
import { getAllCategories, getCategoryBySlug } from '@/lib/api';
import { locale } from '@/types';

import NestedCategories from './NestedCategories';
import BackButton from '../../shared/BackButton';
import PageMainHeader from '../../shared/page-elements/PageMainHeader';
import CategoryEditForm from '../forms/CategoryEditForm';
import CategoryDeleteModal from '../modals/CategoryDeleteModal';
import NestedCategoryAddModal from '../modals/NestedCategoryAddModal';

interface IEditCategoryPageProps {
  categorySlug: string;
  locale: locale;
}

export default async function EditCategoryPage({
  categorySlug,
  locale,
}: IEditCategoryPageProps) {
  const [category, categories] = await Promise.all([
    getCategoryBySlug(categorySlug, routing.locales),
    getAllCategories(),
  ]);

  if (!category) {
    notFound();
  }

  const childCategoriesIds = new Set(
    category.childCategories.flatMap(child => child.id)
  );
  const parentCategoriesIds = new Set(
    category.parentCategories.flatMap(parent => parent.id)
  );

  const filteredArray = categories
    .filter(item => item.main === !category.main)
    .filter(item =>
      category.main
        ? !childCategoriesIds.has(item.id)
        : !parentCategoriesIds.has(item.id)
    );

  const title = `Редагування ${category.main ? 'батьківської' : 'дочірньої'} категорії <span class='font-semibold'>${category.name[locale]}</span>`;

  return (
    <section>
      <Container>
        <BackButton href='/dashboard/categories' title='Всі категорії' />
        <PageMainHeader htmlTitle={true} title={title} className='mb-8' />

        <CategoryEditForm category={category} />

        <NestedCategories category={category} />

        <CategoryDeleteModal
          categoryId={category.id}
          categoryTitle={category.name[locale]}
        />

        <NestedCategoryAddModal
          availableSubcategories={filteredArray}
          baseCategoryId={category.id}
          main={category.main}
        />
      </Container>
    </section>
  );
}
