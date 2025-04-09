import { CATEGORY_BY_SLUG_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapCategory } from '@/lib/utils';
import { Category } from '@/models';
import { ICategoryMapped, ICategoryPopulated, locale } from '@/types';

export async function getFullCategoryBySlug(
  slug: string,
  locale: locale
): Promise<ICategoryMapped | null> {
  try {
    await dbConnect();

    const category = await Category.findOne({
      [`slug.${locale}`]: slug,
    })
      .populate('childCategories')
      .populate('parentCategories')
      .lean<ICategoryPopulated>();

    if (!category) return null;
    if (!category)
      throw new Error('Категорія за вказанним ідентифікатором не знайдена');

    return mapCategory(category);
  } catch (e: unknown) {
    console.error(CATEGORY_BY_SLUG_FETCH_FAILED, e);
    return null;
  }
}
