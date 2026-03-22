'use server';

import dbConnect from '@/lib/db';
import { Review } from '@/models';

export async function getPendingReviewsCount(): Promise<number> {
  try {
    await dbConnect();
    return await Review.countDocuments({ approved: false });
  } catch (e: unknown) {
    console.error('Failed to fetch pending reviews count', e);
    return 0;
  }
}
