'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Review } from '@/models';

export async function deleteReviewById(id: string): Promise<boolean> {
  try {
    await dbConnect();

    const result = await Review.findByIdAndDelete(id);

    if (!result) throw new Error('Відгук не знайдено');

    revalidatePath('/*/dashboard/reviews');
    return true;
  } catch (e: unknown) {
    console.error('Failed to delete review', e);
    throw e;
  }
}
