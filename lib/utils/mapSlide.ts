import { ISlideMapped, ISlidePopulated } from '@/types';

export function mapSlide(slide: ISlidePopulated): ISlideMapped {
  return {
    id: slide._id.toString(),
    translatedData: slide.translatedData,
    createdAt: slide.createdAt
      ? new Date(slide.createdAt).toISOString()
      : undefined,
    updatedAt: slide.updatedAt
      ? new Date(slide.updatedAt).toISOString()
      : undefined,
  };
}
