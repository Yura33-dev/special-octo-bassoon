import mongoose, { model, models } from 'mongoose';

import { IReviewApi } from '@/types';

const reviewSchema = new mongoose.Schema<IReviewApi>(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    authorName: { type: String, required: true },
    authorContact: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, minlength: 10, maxlength: 1000 },
    managerReview: { type: String, default: null, maxlength: 500 },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

const Review = models?.Review || model<IReviewApi>('Review', reviewSchema);

export default Review;
