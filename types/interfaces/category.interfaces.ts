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
  parentCategories: Array<{
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
  updatedAt: Date;
  createdAt: Date;
}

export interface IMappedNestedCategories {
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
    slug: string;
    image: string;
  }>;
  parentCategories: Array<{
    _id: string;
    name: string;
    slug: string;
    image: string;
  }>;
  updatedAt: Date;
  createdAt: Date;
}

export interface IEditCategoryFormField {
  nameUk: string;
  nameRu: string;
  slugUk: string;
  slugRu: string;
  sortOrder: number;
  featured: boolean;
  visible: boolean;
  image: File | string | null;
}

export interface IEditCategoryStructured {
  name: { [key: string]: string };
  slug: { [key: string]: string };
  sortOrder: number;
  featured: boolean;
  visible: boolean;
  image?: string;
}

export interface ICreateCategoryFormField {
  nameUk: string;
  nameRu: string;
  slugUk: string;
  slugRu: string;
  main: boolean;
  sortOrder: number;
  featured: boolean;
  visible: boolean;
  image: File | string | null;
  childCategories: Array<string>;
  parentCategories: Array<string>;
}

export interface ICreateCategoryStructured {
  name: { [key: string]: string };
  slug: { [key: string]: string };
  main: boolean;
  sortOrder: number;
  featured: boolean;
  visible: boolean;
  image: string;
  childCategories: Array<string>;
  parentCategories: Array<string>;
}
