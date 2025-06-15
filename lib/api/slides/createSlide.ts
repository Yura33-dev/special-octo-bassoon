'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Slide } from '@/models';
import { ISlideApi, ISlideForm } from '@/types';

export async function createSlide(packData: ISlideForm): Promise<undefined> {
  try {
    await dbConnect();

    const slide: ISlideApi = await Slide.create(packData);

    if (!slide) {
      throw new Error('Виникла помилка при збережені банеру');
    }

    revalidatePath('/*/dashboard/banners');
    return;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error('Some error occurred while slide creating...', error);
    }
  }
}
