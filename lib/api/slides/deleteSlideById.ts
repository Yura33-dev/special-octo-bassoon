'use server';

import { config } from '@/lib/config';
import dbConnect from '@/lib/db';
import { Slide } from '@/models';
import { ISlidePopulated } from '@/types';

export async function deleteSlideById(bannerId: string) {
  try {
    await dbConnect();

    const isSlideExist = await Slide.exists({ _id: bannerId });

    if (!isSlideExist) {
      throw new Error('Баннер з таким ідентифікатором не існує');
    }

    const deletedSlide = await Slide.findOneAndDelete({
      _id: bannerId,
    }).lean<ISlidePopulated>();

    await fetch(`${config.NEXT_PUBLIC_APP_URL}/api/v1/admin/banners`, {
      method: 'DELETE',
      body: JSON.stringify({
        bannerImageRu: deletedSlide!.translatedData['ru'].image,
        bannerImageUa: deletedSlide!.translatedData['uk'].image,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      console.error('Some error occurred while slide deleting...', error);
    }
  }
}
