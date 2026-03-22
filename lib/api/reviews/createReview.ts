'use server';

import dbConnect from '@/lib/db';
import { Review } from '@/models';
import { IReviewForm } from '@/types';

export async function createReview(data: IReviewForm): Promise<boolean | null> {
  try {
    await dbConnect();

    await Review.create({
      productId: data.productId,
      authorName: data.authorName,
      authorContact: data.authorContact,
      rating: data.rating,
      comment: data.comment,
      managerReview: data.managerReview || null,
      approved: false,
    });

    return true;
  } catch (e: unknown) {
    console.error('Failed to create review', e);
    return null;
  }
}
