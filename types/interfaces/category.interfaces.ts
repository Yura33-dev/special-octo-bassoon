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

export interface ICategoryApiPopulated {
  _id: string;
  name: { [key: string]: string };
  slug: { [key: string]: string };
  sortOrder: number;
  visible: boolean;
  featured: boolean;
  image: string;
  main: boolean;
  childCategories: Array<{
    _id: string;
    name: { [key: string]: string };
    slug: { [key: string]: string };
    sortOrder: number;
    visible: boolean;
    featured: boolean;
    image: string;
    main: boolean;
    childCategories: Array<string>;
    parentCategories: Array<string>;
    updatedAt: Date | null;
    createdAt: Date | null;
  }>;
  parentCategories: Array<string>;
  updatedAt: Date;
  createdAt: Date;
}

export interface IMappedChildCategories {
  _id: string;
  name: { [key: string]: string };
  slug: { [key: string]: string };
  sortOrder: number;
  visible: boolean;
  featured: boolean;
  image: string;
  main: boolean;
  childCategories: Array<{
    _id: string;
    name: string;
    image: string;
  }>;
  parentCategories: Array<string>;
  updatedAt: Date;
  createdAt: Date;
}

export interface IEditCategory {
  nameUk: string;
  nameRu: string;
  slugUk: string;
  slugRu: string;
  sortOrder: number;
  featured: boolean;
  visible: boolean;
  image: File | string | null;
}

export interface IEditCategoryToDB {
  name: { [key: string]: string };
  slug: { [key: string]: string };
  sortOrder: number;
  featured: boolean;
  visible: boolean;
  image?: string;
}
