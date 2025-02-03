import { Document, ObjectId } from 'mongoose';

export interface IPackagingApi extends Document {
  _id: ObjectId;
  translatedData: Record<string, ITranslatedPackagingData>;
  showPricePerUnit: boolean;
}

export interface ITranslatedPackagingData {
  type: string;
  measureIn: string;
  measureValue: number;
}

export interface IPackaging {
  id: string;
  data: ITranslatedPackagingData;
  showPricePerUnit: boolean;
}

export interface IProductPackVariantsApi {
  default: {
    _id: ObjectId;
    translatedData: Record<string, ITranslatedPackagingData>;
    quantity: number;
    price: number;
    showPricePerUnit: boolean;
  };
  items: Array<{
    packId: {
      _id: ObjectId;
      translatedData: Record<string, ITranslatedPackagingData>;
      showPricePerUnit: boolean;
    };
    quantity: number;
    price: number;
  }>;
}

export interface IProductPackVariants {
  default: IProductPack | null;
  items: Array<IProductPack> | [];
}

export interface IProductPack {
  id: string;
  type: string;
  measureIn: string;
  measureValue: number;
  quantity: number;
  price: number;
  showPricePerUnit: boolean;
}
