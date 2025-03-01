import { Document, ObjectId } from 'mongoose';

export interface IFilterApi extends Document {
  _id: ObjectId;
  slug: string;
  translatedData: Record<string, { filterTitle: string }>;
  variants: Array<{
    variantSlug: string;
    translatedData: Record<string, { variantTitle: string }>;
  }>;
}

export interface IFilter {
  id: string;
  slug: string;
  title: string;
  variants: Array<{ slug: string; title: string }>;
}

export interface IFilterInProductApi {
  filter: {
    _id: ObjectId;
    slug: string;
    translatedData: Record<string, { filterTitle: string }>;
    variants: Array<{
      variantSlug: string;
      translatedData: Record<string, { variantTitle: string }>;
    }>;
  };
  value: string;
}

export interface IFilterInProduct {
  id: string;
  slug: string;
  title: string;
  variants: Array<{ slug: string; title: string }>;
  value: string;
}
