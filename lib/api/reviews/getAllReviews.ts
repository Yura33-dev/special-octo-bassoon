'use server';

import { ADMIN_REVIEWS_DISPLAY_LIMIT } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapAdminReview } from '@/lib/utils';
import { calculatePaginationData } from '@/lib/utils/calculatePagination';
import { Review } from '@/models';
import { IReviewPopulated, IReviewsResult } from '@/types';

export async function getAllReviews(
  approved: boolean,
  page: number = 1,
  limit: number = ADMIN_REVIEWS_DISPLAY_LIMIT
): Promise<IReviewsResult> {
  try {
    await dbConnect();

    const skip = (page - 1) * limit;
    const filter = { approved };

    const [reviews, totalCount] = await Promise.all([
      Review.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'productId',
          populate: { path: 'categories' },
        })
        .lean<IReviewPopulated[]>(),
      Review.countDocuments(filter),
    ]);

    return {
      reviews: reviews.map(review => mapAdminReview(review)),
      pagination: calculatePaginationData(totalCount, limit, page),
    };
  } catch (e: unknown) {
    console.error('Failed to fetch all reviews', e);
    return {
      reviews: [],
      pagination: calculatePaginationData(0, limit, page),
    };
  }
}
