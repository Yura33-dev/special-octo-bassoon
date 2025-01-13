'use server';

import { SLIDES_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Slide } from '@/models';
import { ISlide, ISlideApi, locale } from '@/types';

export async function getAllSlides(locale: locale): Promise<Array<ISlide>> {
  try {
    await dbConnect();

    const slides = await Slide.find({}).lean<Array<ISlideApi>>();

    const transformedSlides: Array<ISlide> = slides
      .map(slide => ({
        id: slide._id.toString(),
        sortOrder: slide.translatedSlideData[locale].sortOrder,
        name: slide.translatedSlideData[locale].name,
        linkTo: slide.translatedSlideData[locale].linkTo,
        image: slide.translatedSlideData[locale].image,
        visible: slide.translatedSlideData[locale].visible,
        updatedAt: slide.updatedAt,
        createdAt: slide.createdAt,
      }))
      .toSorted((first, second) => first.sortOrder - second.sortOrder);

    return transformedSlides;
  } catch (error) {
    throw new Error(`Error: ${SLIDES_FETCH_FAILED}. ${error}`);
  }
}
