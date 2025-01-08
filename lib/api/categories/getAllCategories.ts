import { CATEGORIES_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Category } from '@/models';
import { ICategory, ICategoryApi, locale } from '@/types';

export async function getAllCategories(
  locale: locale
): Promise<Array<ICategory>> {
  try {
    await dbConnect();

    const categories = await Category.find({ visible: true, main: true })
      .populate('childCategories')
      .lean<Array<ICategoryApi>>();

    const transformedCategories = transformCategories(categories, locale);

    return transformedCategories;
  } catch (error) {
    throw new Error(`Error: ${CATEGORIES_FETCH_FAILED}. ${error}`);
  }
}

export const transformCategories = (
  categories: Array<ICategoryApi>,
  locale: locale
): Array<ICategory> => {
  const mappedCategories = categories.map(category => {
    return {
      id: category._id.toString(),
      name: category.name[locale] || 'N/A',
      slug: category.slug[locale] || 'N/A',
      main: category.main,
      sortOrder: category.sortOrder,
      visible: category.visible,
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
            updatedAt: childCategory.updatedAt ?? null,
            createdAt: childCategory.createdAt ?? null,
          };
        })
        .filter(childCategory => childCategory.visible === true),
    };
  });

  return mappedCategories;
};
