'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Slide } from '@/models';
import { ISlideApi, ISlideForm, ISlideMapped } from '@/types';

export async function patchSlideById(
  slideId: string,
  data: ISlideForm
): Promise<ISlideMapped | object | undefined> {
  try {
    await dbConnect();

    const result: ISlideApi | null = await Slide.findOneAndUpdate(
      { _id: slideId },
      { translatedData: data.translatedData },
      { new: true }
    );

    if (!result) throw new Error('Банер не знайдений');

    revalidatePath('/*/dashboard/banners');
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error('Some error occurred while slide updating...', error);
      return {};
    }
  }
}
