import { Document, ObjectId } from 'mongoose';

export interface ISlideApi extends Document {
  _id: ObjectId;
  translatedData: Map<string, ITranslatedSlideData>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISlidePopulated {
  _id: ObjectId;
  translatedData: Record<string, ITranslatedSlideData>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISlideMapped {
  id: string;
  translatedData: Record<string, ITranslatedSlideData>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ITranslatedSlideData {
  linkTo: string | null;
  image: string | null;
  name: string;
  sortOrder: number;
  visible: boolean;
}

export interface ISlideForm {
  translatedData: Record<string, ITranslatedSlideData>;
}
