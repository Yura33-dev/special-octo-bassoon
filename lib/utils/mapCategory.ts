import { ICategoryMapped, ICategoryPopulated } from '@/types';

export function mapCategory(category: ICategoryPopulated): ICategoryMapped {
  return {
    id: category._id.toString(),
    name: category.name ?? 'N/A',
    slug: category.slug ?? 'N/A',
    sortOrder: category.sortOrder,
    visible: category.visible ?? true,
    featured: category.featured ?? false,
    image: category.image ?? '',
    main: category.main ?? false,
    updatedAt: category.updatedAt
      ? new Date(category.updatedAt).toISOString()
      : null,
    createdAt: category.createdAt
      ? new Date(category.createdAt).toISOString()
      : null,
    parentCategories: category.parentCategories.map(parentCat => ({
      id: parentCat._id.toString(),
      name: parentCat.name,
      slug: parentCat.slug,
      sortOrder: parentCat.sortOrder,
      visible: parentCat.visible,
      featured: parentCat.featured,
      image: parentCat.image,
      main: parentCat.main,
      updatedAt: parentCat.updatedAt
        ? new Date(parentCat.updatedAt).toISOString()
        : null,
      createdAt: parentCat.createdAt
        ? new Date(parentCat.createdAt).toISOString()
        : null,
    })),
    childCategories: category.childCategories.map(childCat => ({
      id: childCat._id.toString(),
      name: childCat.name,
      slug: childCat.slug,
      sortOrder: childCat.sortOrder,
      visible: childCat.visible,
      featured: childCat.featured,
      image: childCat.image,
      main: childCat.main,
      updatedAt: childCat.updatedAt
        ? new Date(childCat.updatedAt).toISOString()
        : null,
      createdAt: childCat.createdAt
        ? new Date(childCat.createdAt).toISOString()
        : null,
    })),
    meta: category.meta ?? {
      uk: { title: null, description: null, keywords: null, seoText: null },
      ru: { title: null, description: null, keywords: null, seoText: null },
    },
  };
}
