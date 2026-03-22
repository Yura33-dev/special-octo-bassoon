import * as Yup from 'yup';

import {
  MANDATORY_FIELD,
  MAX_LENGTH_100,
  MAX_LENGTH_50,
  MIN_LENGTH,
  REVIEW_COMMENT_MAX,
  REVIEW_COMMENT_MIN,
  REVIEW_MANAGER_MAX,
  REVIEW_RATING_REQUIRED,
} from '@/lib/constants/validation.constant';

export const reviewValidationSchema = Yup.object({
  authorName: Yup.string()
    .min(2, MIN_LENGTH)
    .max(50, MAX_LENGTH_50)
    .required(MANDATORY_FIELD),
  authorContact: Yup.string()
    .min(2, MIN_LENGTH)
    .max(100, MAX_LENGTH_100)
    .required(MANDATORY_FIELD),
  rating: Yup.number()
    .min(1, REVIEW_RATING_REQUIRED)
    .max(5)
    .required(MANDATORY_FIELD),
  comment: Yup.string()
    .min(10, REVIEW_COMMENT_MIN)
    .max(1000, REVIEW_COMMENT_MAX)
    .required(MANDATORY_FIELD),
  managerReview: Yup.string().max(500, REVIEW_MANAGER_MAX),
});
