import { Document, Types } from 'mongoose';

export interface ICategoryApi extends Document {
  _id: string;
  name: { [key: string]: string };
  slug: { [key: string]: string };
  main: boolean;
  sortOrder: number;
  visible: boolean;
  parentCategories: Array<Types.ObjectId>;
  childCategories: Array<IChildCategoryApi>;
  updatedAt: Date;
  createdAt: Date;
}

interface IChildCategoryApi {
  _id: string;
  name: { [key: string]: string };
  slug: { [key: string]: string };
  sortOrder: number;
  visible: boolean;
  updatedAt: Date;
  createdAt: Date;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  main: boolean;
  sortOrder: number;
  visible: boolean;
  childCategories: Array<IChildCategory>;
  updatedAt: Date | null;
  createdAt: Date | null;
}

interface IChildCategory {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  visible: boolean;
  updatedAt: Date | null;
  createdAt: Date | null;
}
