import { Document, ObjectId } from 'mongoose';

export interface ISlideApi extends Document {
  _id: ObjectId;
  name: string;
  image: string;
  visible: boolean;
  sortOrder: number;
  linkTo: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISlide {
  id: string;
  name: string;
  image: string;
  visible: boolean;
  sortOrder: number;
  linkTo: string;
  createdAt: Date;
  updatedAt: Date;
}
