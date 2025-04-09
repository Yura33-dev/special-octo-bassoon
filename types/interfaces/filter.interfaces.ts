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

export interface IFilterMapped {
  id: string;
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
  id: string;
  filter: ObjectId;
  value: string;
}

export interface IFilterInProductPopulated {
  id: string;
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

export interface IFilterInProductMapped {
  id: string;
  filter: {
    id: string;
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
} // TODO: delete

interface IVariant {
  variantSlug: string;
  translatedData: {
    uk: { variantTitle: string };
    ru: { variantTitle: string };
  };
}

export interface ICreateFilterFormField {
  slug: string;
  translatedData: {
    uk: { filterTitle: string };
    ru: { filterTitle: string };
  };
  variants: Array<IVariant>;
}
