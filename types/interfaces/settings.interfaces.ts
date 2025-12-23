import { Document, ObjectId } from 'mongoose';

export interface ISettingsApi extends Document {
  _id: ObjectId;
  siteName: string;
  translatedData: Map<string, ITranslatedSettingsData>;
  contacts: IContactsData;
}

export interface ISettingsLeaned {
  _id: ObjectId;
  siteName: string;
  translatedData: Record<string, ITranslatedSettingsData>;
  contacts: IContactsData;
}

export interface ISettingsMapped {
  id: string;
  siteName: string;
  translatedData: Record<string, ITranslatedSettingsData>;
  contacts: IContactsData;
}

export interface ITranslatedSettingsData {
  slogan: string;
  deliveryProductMethods: Array<string>;
  paymentProductMethods: Array<string>;
  refundProductMethod: string;
  workSchedule: {
    workDays: string;
    weekendDays: string;
  };
  location: string;
  FOP: {
    title: string;
    code: string;
  };
}

interface IContactsData {
  phones: Array<[string, string]>;
  email: string;
}
