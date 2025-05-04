import { Document, ObjectId } from 'mongoose';

import {
  ICategoryApi,
  ICategoryMapped,
  ICategoryPopulated,
  IFilterInProductApi,
  IFilterInProductMapped,
  IFilterInProductPopulated,
  IPackaginInProduct,
  IProducerMapped,
  IProducerPopulated,
  IProductPackVariantsApi,
  IProductPackVariantsMapped,
  IProductPackVariantsPopulated,
} from '@/types';

export interface IProductApi extends Document {
  _id: ObjectId;
  translatedData: Record<string, ITranslatedData>;
  packaging: IProductPackVariantsApi;
  //   reviews: Array<string>;
  categories: Array<ICategoryApi>;
  labels: Array<Labels> | [];
  visible: boolean;
  producer: ObjectId;
  imgUrl: string;
  filters: Array<IFilterInProductApi>;
  updatedAt: Date;
  createdAt: Date;
}

export interface IProductPopulated {
  _id: ObjectId;
  translatedData: Record<string, ITranslatedData>;
  packaging: IProductPackVariantsPopulated;
  //   reviews: Array<string>;
  categories: Array<ICategoryPopulated>;
  labels: Array<Labels> | [];
  visible: boolean;
  producer: IProducerPopulated;
  imgUrl: string;
  filters: Array<IFilterInProductPopulated>;
  updatedAt: Date;
  createdAt: Date;
}

export interface IProductMapped {
  id: string;
  translatedData: Record<string, ITranslatedData>;
  packaging: IProductPackVariantsMapped;
  //   reviews: Array<string>;
  categories: Array<ICategoryMapped>;
  visible: boolean;
  producer: IProducerMapped;
  labels: Array<string>;
  imgUrl: string;
  filters: Array<IFilterInProductMapped>;
}

export interface ITranslatedData {
  name: string;
  slug: string;
  description?: string | null;
  country: string | null;
  meta: IMetaData;
}

export interface IMetaData {
  title: string;
  description: string;
  keywords?: string | null;
}

type Labels = 'top' | 'sale';

export interface IProductForm {
  translatedData: Record<string, ITranslatedData>;
  packaging: IPackaginInProduct;
  categories: Array<string>;
  imgUrl: File | string | null;
  visible: boolean;
  filters: Array<{ id: string; filter: string; value: string }>;
  labels: Array<string>;
  producer: string | null;
}
