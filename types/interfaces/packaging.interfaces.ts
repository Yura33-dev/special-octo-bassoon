import { Document } from 'mongoose';

export interface IPackagingApi extends Document {
  _id: string;
  translatedData: Record<string, ITranslatedPackagingData>;
  inStock: Stock;
  price: number;
  quantity: number | null;
  default: boolean;
}

export interface IPackaging {
  id: string;
  data: ITranslatedPackagingData;
  inStock: Stock;
  price: number;
  quantity: number | null;
  default: boolean;
}

export interface ITranslatedPackagingData {
  type: string;
  measureIn: string;
  measureValue: number;
}

type Stock = 'inStock' | 'outStock' | 'preOrder';
