import { Document, ObjectId } from 'mongoose';

export interface ISettingsApi extends Document {
  _id: ObjectId;
  siteName: string;
  translatedData: ITranslatedSettingsData;
}

export interface ITranslatedSettingsData {
  [key: string]: {
    slogan: string;
    deliveryProductMethods: Array<string>;
    paymentProductMethods: Array<string>;
    refundProductMethod: string;
  };
}

export interface ISettings {
  siteName: string;
  translatedData: {
    slogan: string;
    deliveryProductMethods: Array<string>;
    paymentProductMethods: Array<string>;
    refundProductMethod: string;
  };
}
