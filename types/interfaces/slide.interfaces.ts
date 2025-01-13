import { Document, ObjectId } from 'mongoose';

export interface ISlideApi extends Document {
  _id: ObjectId;
  translatedSlideData: Record<string, ITranslatedSlideData>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITranslatedSlideData {
  linkTo: string | null;
  image: string | null;
  name: string | null;
  sortOrder: number;
  visible: boolean;
}

export interface ISlide {
  id: string;
  sortOrder: number;
  name: string | null;
  linkTo: string | null;
  image: string | null;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFilteredSlide extends Omit<ISlide, 'image' | 'name'> {
  image: string;
  name: string;
}
