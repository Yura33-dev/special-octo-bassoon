'use server';

import { DB_CONNECTION_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Category } from '@/models';
import { ICategoryApi, locale } from '@/types';

export async function getCategoryBySlug(slug: string, locale: locale) {
  const connection = await dbConnect();

  if (!connection) {
    throw new Error(DB_CONNECTION_FAILED);
  }

  const category = await Category.findOne({
    [`slug.${locale}`]: slug,
  })
    .select('name slug _id')
    .lean<ICategoryApi>();

  if (category) {
    return {
      name: category.name[locale],
      slug: category.slug[locale],
      id: category._id.toString(),
    };
  } else {
    return null;
  }
}
