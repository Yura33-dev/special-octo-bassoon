'use server';

import { PACKAGING_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapPackaging } from '@/lib/utils';
import { Packaging } from '@/models';
import { IPackagingMapped, IPackagingPopulated, locale } from '@/types';

export async function getAllPackaging(
  locale: locale,
  filter: Record<string, string> | object = {}
): Promise<Array<IPackagingMapped> | []> {
  try {
    await dbConnect();

    const packaging =
      await Packaging.find(filter).lean<Array<IPackagingPopulated>>();

    return packaging
      .map(pack => mapPackaging(pack))
      .toSorted((a, b) => {
        const typeComparison = a.translatedData[locale].type.localeCompare(
          b.translatedData[locale].type
        );
        if (typeComparison !== 0) return typeComparison;
        return (
          a.translatedData[locale].measureValue -
          b.translatedData[locale].measureValue
        );
      });
  } catch (error) {
    console.error(`Error: ${PACKAGING_FETCH_FAILED}. ${error}`);
    return [];
  }
}
