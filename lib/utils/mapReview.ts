import { IReviewAdminMapped, IReviewMapped, IReviewPopulated } from '@/types';

export function mapReview(review: IReviewPopulated): IReviewMapped {
  return {
    id: review._id.toString(),
    product: {
      name: {
        uk: review.productId?.translatedData['uk'].name,
        ru: review.productId?.translatedData['ru'].name,
      },
      slug: {
        uk: review.productId?.translatedData['uk'].slug,
        ru: review.productId?.translatedData['ru'].slug,
      },
      mainCategorySlug: {
        uk: review.productId?.categories[0].slug['uk'],
        ru: review.productId?.categories[0].slug['ru'],
      },
      subCategorySlug: {
        uk: review.productId?.categories[1].slug['uk'],
        ru: review.productId?.categories[1].slug['ru'],
      },
    },
    authorName: review.authorName,
    rating: review.rating,
    comment: review.comment,
    managerReview: review.managerReview ?? null,
    createdAt: review.createdAt
      ? new Date(review.createdAt).toISOString()
      : new Date().toISOString(),
  };
}

export function mapAdminReview(review: IReviewPopulated): IReviewAdminMapped {
  return {
    ...mapReview(review),
    authorContact: review.authorContact,
    approved: review.approved,
  };
}
