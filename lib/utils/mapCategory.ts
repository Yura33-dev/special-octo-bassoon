import { ICategory, ICategoryApi, locale } from '@/types';

export function mapCategory(category: ICategoryApi, locale: locale): ICategory {
  return {
    id: category._id.toString(),
    name: category.name?.[locale] ?? 'N/A',
    slug: category.slug?.[locale] ?? 'N/A',
    sortOrder: category.sortOrder,
    visible: category.visible ?? true,
    featured: category.featured ?? false,
    image: category.image ?? '',
    main: category.main ?? false,
    updatedAt: category.updatedAt ?? null,
    createdAt: category.createdAt ?? null,
    parentCategories: Array.isArray(category.parentCategories)
      ? category.parentCategories
          .map(parent =>
            typeof parent === 'object'
              ? mapCategory(parent as unknown as ICategoryApi, locale)
              : ({ id: String(parent) } as ICategory)
          )
          .filter(parent => parent.visible === true)
      : [],

    childCategories: Array.isArray(category.childCategories)
      ? category.childCategories
          .map(child =>
            typeof child === 'object'
              ? mapCategory(child as unknown as ICategoryApi, locale)
              : ({ id: String(child) } as ICategory)
          )
          .filter(childCategory => childCategory.visible === true)
      : [],
  };
}
