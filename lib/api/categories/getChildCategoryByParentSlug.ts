'use server';

import { PARENT_CATEGORY_FETCH_FAILED, SMTH_WENT_WRONG } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapCategory } from '@/lib/utils';
import { Category } from '@/models';
import { ICategory, ICategoryApi, locale } from '@/types';

export async function getChildCategoriesByParentSlug(
  slug: string,
  locale: locale
) {
  try {
    await dbConnect();

    const parentCategory: ICategoryApi | null = await Category.findOne({
      [`slug.${locale}`]: slug,
    });

    if (!parentCategory) {
      console.error(PARENT_CATEGORY_FETCH_FAILED);
      return [];
    }

    const childCategories: Array<ICategoryApi> | null = await Category.find({
      parentCategories: parentCategory._id,
    })
      .populate('parentCategories')
      .populate('childCategories')
      .lean<Array<ICategoryApi>>();

    const transformedCategories: Array<ICategory> = childCategories.map(
      category => mapCategory(category, locale)
    );

    return transformedCategories;
  } catch (error) {
    console.error(SMTH_WENT_WRONG, error);
    return [];
  }
}
