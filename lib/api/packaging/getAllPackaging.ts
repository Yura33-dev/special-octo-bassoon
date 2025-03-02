'use server';

import { PACKAGING_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Packaging } from '@/models';
import { IPackaging, IPackagingApi, locale } from '@/types';

export async function getAllPackaging(
  locale: locale,
  filter: Record<string, string> | object = {}
): Promise<Array<IPackaging> | []> {
  try {
    await dbConnect();

    const packaging = await Packaging.find(filter).lean<Array<IPackagingApi>>();

    const transformedPackaging = packaging
      .map(packaging => ({
        id: packaging._id.toString(),
        data: packaging.translatedData[locale],
        showPricePerUnit: packaging.showPricePerUnit,
      }))
      .toSorted((a, b) => {
        const typeComparison = a.data.type.localeCompare(b.data.type);
        if (typeComparison !== 0) return typeComparison;
        return a.data.measureValue - b.data.measureValue;
      });

    return transformedPackaging;
  } catch (error) {
    console.error(`Error: ${PACKAGING_FETCH_FAILED}. ${error}`);
    return [];
  }
}
