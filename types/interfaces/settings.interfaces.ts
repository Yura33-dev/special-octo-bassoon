import { Document, ObjectId } from 'mongoose';

export interface ISettingsApi extends Document {
  _id: ObjectId;
  siteName: string;
  translatedData: ITranslatedSettingsData;
}

export interface ITranslatedSettingsData {
  [key: string]: {
    slogan: string;
  };
}

export interface ISettings {
  id: string;
  siteName: string;
  translatedData: { slogan: string };
}
