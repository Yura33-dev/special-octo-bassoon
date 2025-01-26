'use server';

import { DB_CONNECTION_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Category } from '@/models';
import { ICategoryApi, locale } from '@/types';

export async function getCategorySlug(
  slug: string | null,
  currentLocale: locale,
  targetLocale: locale
): Promise<string | null> {
  const connection = await dbConnect();

  if (!connection) {
    throw new Error(DB_CONNECTION_FAILED);
  }

  if (!slug) return null;

  const category = await Category.findOne({
    [`slug.${currentLocale}`]: slug,
  }).lean<ICategoryApi>();

  if (category) {
    return category.slug[targetLocale];
  } else {
    return null;
  }
}
