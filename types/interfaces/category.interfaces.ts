import { Document } from 'mongoose';

export interface ICategoryApi extends Document {
  _id: string;
  name: { [key: string]: string };
  slug: { [key: string]: string };
  main: boolean;
  sortOrder: number;
  visible: boolean;
  featured: boolean;
  image: string;
  parentCategories: Array<IParentCategoryApi>;
  childCategories: Array<IChildCategoryApi>;
  updatedAt: Date;
  createdAt: Date;
}

interface IParentCategoryApi {
  slug: { [key: string]: string };
}

interface IChildCategoryApi {
  _id: string;
  name: { [key: string]: string };
  slug: { [key: string]: string };
  sortOrder: number;
  visible: boolean;
  featured: boolean;
  image: string;
  updatedAt: Date;
  createdAt: Date;
}

interface IParentCategory {
  slug: string;
}

export interface IChildCategory {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
  visible: boolean;
  featured: boolean;
  image: string;
  updatedAt: Date | null;
  createdAt: Date | null;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  main: boolean;
  sortOrder: number;
  visible: boolean;
  featured: boolean;
  image: string;
  childCategories: Array<IChildCategory>;
  parentCategories: Array<IParentCategory>;
  updatedAt: Date | null;
  createdAt: Date | null;
}
