import { Document, ObjectId } from 'mongoose';

export interface ICategoryApi extends Document {
  _id: ObjectId;
  name: { [key: string]: string };
  slug: { [key: string]: string };
  sortOrder: number;
  visible: boolean;
  featured: boolean;
  image: string;
  main: boolean;
  childCategories: Array<ObjectId>;
  parentCategories: Array<ObjectId>;
  updatedAt: Date;
  createdAt: Date;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  visible: boolean;
  featured: boolean;
  image: string;
  main: boolean;
  childCategories: Array<ICategory>;
  parentCategories: Array<ICategory>;
  updatedAt: Date | null;
  createdAt: Date | null;
}
