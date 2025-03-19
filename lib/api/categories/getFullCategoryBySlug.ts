import { CATEGORY_BY_SLUG_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Category } from '@/models';
import {
  ICategoryApiPopulated,
  IMappedNestedCategories,
  locale,
} from '@/types';

export async function getFullCategoryBySlug(
  slug: string,
  locale: locale
): Promise<IMappedNestedCategories | null> {
  try {
    await dbConnect();

    const category = await Category.findOne({
      [`slug.${locale}`]: slug,
    })
      .populate('childCategories')
      .populate('parentCategories')
      .lean<ICategoryApiPopulated>();

    if (!category) return null;

    const parsedCategory: ICategoryApiPopulated = JSON.parse(
      JSON.stringify(category)
    );

    const restructuredCategory: IMappedNestedCategories = {
      _id: parsedCategory._id,
      name: { uk: parsedCategory.name['uk'], ru: parsedCategory.name['ru'] },
      slug: { uk: parsedCategory.slug['uk'], ru: parsedCategory.slug['ru'] },
      sortOrder: parsedCategory.sortOrder,
      visible: parsedCategory.visible,
      featured: parsedCategory.featured,
      image: parsedCategory.image,
      main: parsedCategory.main,
      updatedAt: parsedCategory.updatedAt,
      createdAt: parsedCategory.createdAt,
      parentCategories: parsedCategory.parentCategories
        .map(item => ({
          _id: item._id,
          name: item.name[locale],
          slug: item.slug[locale],
          image: item.image ?? '/no-image.webp',
        }))
        .toSorted((a, b) => a.name.localeCompare(b.name)),
      childCategories: parsedCategory.childCategories
        .map(item => ({
          _id: item._id,
          name: item.name[locale],
          slug: item.slug[locale],
          image: item.image ?? '/no-image.webp',
        }))
        .toSorted((a, b) => a.name.localeCompare(b.name)),
    };

    return restructuredCategory;
  } catch (e: unknown) {
    console.error(CATEGORY_BY_SLUG_FETCH_FAILED, e);
    return null;
  }
}
