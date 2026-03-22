'use server';

import { PRODUCT_REVIEWS_DISPLAY_LIMIT } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { mapReview } from '@/lib/utils';
import { calculatePaginationData } from '@/lib/utils/calculatePagination';
import { Review } from '@/models';
import { IReviewPopulated, IReviewsByProduct } from '@/types';

export async function getReviewsByProductId(
  productId: string,
  page: number = 1,
  limit: number = PRODUCT_REVIEWS_DISPLAY_LIMIT
): Promise<IReviewsByProduct> {
  try {
    await dbConnect();

    const skip = (page - 1) * limit;

    const [reviews, totalCount] = await Promise.all([
      Review.find({ productId, approved: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'productId',
          populate: { path: 'categories' },
        })
        .lean<IReviewPopulated[]>(),
      Review.countDocuments({ productId, approved: true }),
    ]);

    const mapped = reviews.map(review => mapReview(review));

    return {
      reviews: mapped,
      pagination: calculatePaginationData(totalCount, limit, page),
    };
  } catch (e: unknown) {
    console.error('Failed to fetch reviews', e);
    return {
      reviews: [],
      pagination: calculatePaginationData(0, limit, page),
    };
  }
}
