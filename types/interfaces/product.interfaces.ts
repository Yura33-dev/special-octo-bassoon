import { Document } from 'mongoose';

import { ICategory, ICategoryApi, IPackaging, IPackagingApi } from '@/types';

export interface IProductApi extends Document {
  _id: string;
  translatedData: Record<string, ITranslatedData>;
  packaging: Array<IPackagingApi>;
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
  packaging: Array<IPackaging>;
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
}

export interface IMetaData {
  title: string;
  description: string;
  keywords: string | null;
}

type Labels = 'top' | 'sale';
