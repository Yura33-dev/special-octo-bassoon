import { ICategory, ICategoryApi, locale } from '@/types';

export function mapCategory(category: ICategoryApi, locale: locale): ICategory {
  return {
    id: category._id.toString(),
    name: category.name[locale] || 'N/A',
    slug: category.slug[locale] || 'N/A',
    main: category.main,
    sortOrder: category.sortOrder,
    visible: category.visible,
    featured: category.featured || false,
    image: category.image || '',
    parentCategories: category.parentCategories.map(parentCategory => ({
      slug: parentCategory.slug[locale],
    })),
    updatedAt: category.updatedAt ?? null,
    createdAt: category.createdAt ?? null,
    childCategories: category.childCategories
      .map(childCategory => {
        return {
          id: childCategory._id.toString(),
          name: childCategory.name[locale] || 'N/A',
          slug: childCategory.slug[locale] || 'N/A',
          sortOrder: childCategory.sortOrder,
          visible: childCategory.visible,
          featured: childCategory.featured || false,
          image: childCategory.image || '',
          updatedAt: childCategory.updatedAt ?? null,
          createdAt: childCategory.createdAt ?? null,
        };
      })
      .filter(childCategory => childCategory.visible === true),
  };
}
