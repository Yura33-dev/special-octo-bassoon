import { Document } from 'mongoose';

import {
  ICategory,
  ICategoryApi,
  ICategoryMapped,
  ICategoryPopulated,
  IFilterInProduct,
  IFilterInProductApi,
  IFilterInProductMapped,
  IFilterInProductPopulated,
  IPackaginInProduct,
  IProductPackVariantsApi,
  IProductPackVariantsMapped,
  IProductPackVariantsPopulated,
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
  filters: Array<IFilterInProductApi>;
  updatedAt: Date;
  createdAt: Date;
}

export interface IProductPopulated {
  _id: string;
  translatedData: Record<string, ITranslatedData>;
  packaging: IProductPackVariantsPopulated;
  //   reviews: Array<string>;
  categories: Array<ICategoryPopulated>;
  labels: Array<Labels> | [];
  visible: boolean;
  producer: string;
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
  producer: string;
  labels: Array<string>;
  imgUrl: string;
  filters: Array<IFilterInProductMapped>;
}

export interface IProduct {
  id: string;
  data: ITranslatedData;
  packaging: IProductPackVariantsMapped;
  //   reviews: Array<string>;
  categories: Array<Pick<ICategory, 'id' | 'name' | 'slug' | 'main'>>;
  visible: boolean;
  producer: string;
  labels: Array<string>;
  imgUrl: string;
  filters: Array<IFilterInProduct> | null;
}

export interface ITranslatedData {
  name: string;
  slug: string;
  description?: string | null;
  country: string;
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
  producer: string;
  labels: Array<string>;
}
