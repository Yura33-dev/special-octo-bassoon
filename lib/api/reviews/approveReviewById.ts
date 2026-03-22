'use server';

import { revalidatePath } from 'next/cache';

import dbConnect from '@/lib/db';
import { Review } from '@/models';

export async function approveReviewById(
  id: string,
  approved: boolean
): Promise<boolean> {
  try {
    await dbConnect();

    const result = await Review.findByIdAndUpdate(id, { approved });

    if (!result) throw new Error('Відгук не знайдено');

    revalidatePath('/*/dashboard/reviews');
    return true;
  } catch (e: unknown) {
    console.error('Failed to update review approval', e);
    return false;
  }
}
