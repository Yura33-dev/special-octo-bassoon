import { SLIDES_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Slide } from '@/models';
import { ISlide, ISlideApi } from '@/types';

export async function getAllSlides(): Promise<Array<ISlide>> {
  try {
    await dbConnect();

    const slides = await Slide.find({ visible: true }).lean<Array<ISlideApi>>();

    const transformedSlides: Array<ISlide> = slides
      .map(slide => ({
        id: slide._id.toString(),
        image: slide.image,
        visible: slide.visible,
        linkTo: slide.linkTo,
        name: slide.name,
        sortOrder: slide.sortOrder,
        updatedAt: slide.updatedAt,
        createdAt: slide.createdAt,
      }))
      .toSorted((first, second) => first.sortOrder - second.sortOrder);

    return transformedSlides;
  } catch (error) {
    throw new Error(`Error: ${SLIDES_FETCH_FAILED}. ${error}`);
  }
}
