import { Document, ObjectId } from 'mongoose';

export interface IPackagingApi extends Document {
  _id: ObjectId;
  translatedData: Map<string, ITranslatedPackagingData>;
  showPricePerUnit: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPackagingPopulated {
  _id: ObjectId;
  translatedData: Record<string, ITranslatedPackagingData>;
  showPricePerUnit: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPackagingMapped {
  id: string;
  translatedData: Record<string, ITranslatedPackagingData>;
  showPricePerUnit: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface ITranslatedPackagingData {
  type: string;
  measureIn: string;
  measureValue: number;
}

export interface IProductPackVariantsApi {
  default: ObjectId;
  items: Array<IProductPackItemsApi>;
}

export interface IProductPackVariantsPopulated {
  default: IPackagingPopulated;
  items: Array<IProductPackItemsPopulated>;
}

export interface IProductPackVariantsMapped {
  default: IPackagingMapped;
  items: Array<IProductPackItemsMapped>;
}

interface IProductPackItemsApi {
  packId: string;
  quantity: number;
  price: number;
}

interface IProductPackItemsPopulated {
  packId: IPackagingPopulated;
  quantity: number;
  price: number;
}

interface IProductPackItemsMapped {
  packId: IPackagingMapped;
  quantity: number;
  price: number;
}

export interface ICreatePackagingFormField {
  measureTypeUk: string;
  measureTypeRu: string;
  measureInUk: string;
  measureInRu: string;
  measureValue: number;
  showPricePerUnit: boolean;
}

export interface ICreatePackagingStructured {
  translatedData: Record<string, ITranslatedPackagingData>;
  showPricePerUnit: boolean;
}

export interface IPackaginInProduct {
  default: string | null;
  items: Array<{
    packId: string | null;
    quantity: number | null;
    price: number;
  }>;
}
