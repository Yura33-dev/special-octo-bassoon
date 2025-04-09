import { Document, ObjectId } from 'mongoose';

export interface IPackagingApi extends Document {
  _id: ObjectId;
  translatedData: Record<string, ITranslatedPackagingData>;
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

// export interface IPackaging {
//   id: string;
//   data: ITranslatedPackagingData;
//   showPricePerUnit: boolean;
//   // TODO: add createdAt & updatedAt field
// } //TODO: delete

export interface IProductPackVariantsApi {
  default: string;
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

// export interface IProductPackVariantsApi {
//   default: IPackagingApi;
//   items: Array<{
//     packId: IPackagingApi;
//     quantity: number;
//     price: number;
//     createdAt?: Date;
//     updatedAt?: Date;
//   }>;
// }

// export interface IProductPackVariants {
//   default: IProductPack | null;
//   items: Array<IProductPack> | [];
// }

// export interface IProductPack {
//   id: string;
//   type: string;
//   measureIn: string;
//   measureValue: number;
//   // quantity: number;
//   // price: number;
//   showPricePerUnit: boolean;
// }

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
