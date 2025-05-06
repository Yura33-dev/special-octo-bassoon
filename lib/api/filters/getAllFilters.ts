'use server';

import { FILTERS_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapFilter } from '@/lib/utils';
import { Filter } from '@/models';
import { IFilterMapped, IFilterPopulated, locale } from '@/types';

export async function getAllFilters(
  locale: locale
): Promise<Array<IFilterMapped> | []> {
  try {
    await dbConnect();

    const filters = await Filter.find({}).lean<Array<IFilterPopulated>>();

    const transformedFilters = filters
      .map(filter => mapFilter(filter))
      .toSorted((a, b) =>
        a.translatedData[locale].filterTitle.localeCompare(
          b.translatedData[locale].filterTitle
        )
      );

    return transformedFilters;
  } catch (error) {
    console.error(`Error: ${FILTERS_FETCH_FAILED}. ${error}`);
    return [];
  }
}
