'use server';

import { SLIDES_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapSlide } from '@/lib/utils';
import { Slide } from '@/models';
import { ISlideMapped, ISlidePopulated } from '@/types';

export async function getAllSlides(): Promise<Array<ISlideMapped> | []> {
  try {
    await dbConnect();

    const slides = await Slide.find({}).lean<Array<ISlidePopulated>>();

    return slides
      .map(slide => mapSlide(slide))
      .toSorted(
        (first, second) =>
          first.translatedData['uk'].sortOrder -
          second.translatedData['uk'].sortOrder
      );
  } catch (error) {
    console.error(`Error: ${SLIDES_FETCH_FAILED}. ${error}`);
    return [];
  }
}
