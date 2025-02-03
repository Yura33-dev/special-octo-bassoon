import { Document } from 'mongoose';

import {
  ICategory,
  ICategoryApi,
  IProductPackVariants,
  IProductPackVariantsApi,
} from '@/types';

export interface IProductApi extends Document {
  _id: string;
  translatedData: Record<string, ITranslatedData>;
  packaging: IProductPackVariantsApi;
  //   reviews: Array<string>;
  categories: Array<ICategoryApi>;
  labels: Array<Labels> | [];
  visible: boolean;
  producer: string;
  imgUrl: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IProduct {
  id: string;
  data: ITranslatedData;
  packaging: IProductPackVariants;
  //   reviews: Array<string>;
  categories: Array<Pick<ICategory, 'id' | 'name' | 'slug' | 'main'>>;
  visible: boolean;
  producer: string;
  labels: Array<string>;
  imgUrl: string;
}

export interface ITranslatedData {
  name: string;
  slug: string;
  description: string | null;
  country: string | null;
  meta: IMetaData;
  characteristics: Array<[string, string]> | null;
}

export interface IMetaData {
  title: string;
  description: string;
  keywords: string | null;
}

type Labels = 'top' | 'sale';
