'use server';

import { FILTERS_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Filter } from '@/models';
import { IFilter, IFilterApi, locale } from '@/types';

export async function getAllFilters(
  locale: locale
): Promise<Array<IFilter> | []> {
  try {
    await dbConnect();

    const filters = await Filter.find({}).lean<Array<IFilterApi>>();

    const transformedFilters = filters
      .map(filter => ({
        id: filter._id.toString(),
        slug: filter.slug,
        title: filter.translatedData[locale].filterTitle,
        variants: filter.variants.map(variant => ({
          slug: variant.variantSlug,
          title: variant.translatedData[locale].variantTitle,
        })),
      }))
      .toSorted((a, b) => a.title.localeCompare(b.title));

    return transformedFilters;
  } catch (error) {
    console.error(`Error: ${FILTERS_FETCH_FAILED}. ${error}`);
    return [];
  }
}
