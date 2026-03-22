import { Document, ObjectId } from 'mongoose';

import { IPagination } from './pagination.interfaces';
import { IProductApi } from './product.interfaces';

export interface IReviewApi extends Document {
  _id: ObjectId;
  productId: ObjectId;
  authorName: string;
  authorContact: string;
  rating: number;
  comment: string;
  managerReview: string | null;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReviewPopulated extends Omit<IReviewApi, 'productId'> {
  productId: IProductApi;
}

export interface IReviewMapped {
  id: string;
  product: {
    name: Record<string, string>;
    slug: Record<string, string>;
    mainCategorySlug: Record<string, string>;
    subCategorySlug: Record<string, string>;
  };
  authorName: string;
  rating: number;
  comment: string;
  managerReview: string | null;
  createdAt: string;
}

export interface IReviewAdminMapped extends IReviewMapped {
  authorContact: string;
  approved: boolean;
}

export interface IReviewForm {
  productId: string;
  authorName: string;
  authorContact: string;
  rating: number;
  comment: string;
  managerReview: string;
}

export interface IReviewsResult {
  reviews: IReviewAdminMapped[];
  pagination: IPagination;
}

export interface IReviewsByProduct {
  reviews: IReviewMapped[];
  pagination: IPagination;
}
