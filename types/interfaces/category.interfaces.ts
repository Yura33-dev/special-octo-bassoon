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

export interface ICategoryPopulated {
  _id: ObjectId;
  name: { [key: string]: string };
  slug: { [key: string]: string };
  sortOrder: number;
  visible: boolean;
  featured: boolean;
  image: string;
  main: boolean;
  childCategories: Array<{
    _id: ObjectId;
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

export interface ICategoryMapped {
  id: string;
  name: { [key: string]: string };
  slug: { [key: string]: string };
  sortOrder: number;
  visible: boolean;
  featured: boolean;
  image: string;
  main: boolean;
  childCategories: Array<{
    id: string;
    name: { [key: string]: string };
    slug: { [key: string]: string };
    sortOrder: number;
    visible: boolean;
    featured: boolean;
    image: string;
    main: boolean;
    updatedAt: string | null;
    createdAt: string | null;
  }>;
  parentCategories: Array<{
    id: string;
    name: { [key: string]: string };
    slug: { [key: string]: string };
    sortOrder: number;
    visible: boolean;
    featured: boolean;
    image: string;
    main: boolean;
    updatedAt: string | null;
    createdAt: string | null;
  }>;
  updatedAt: string | null;
  createdAt: string | null;
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

export interface ICategoryForm {
  name: { [key: string]: string };
  slug: { [key: string]: string };
  main: boolean;
  sortOrder: number;
  featured: boolean;
  visible: boolean;
  image?: string | null | File;
  childCategories?: Array<string>;
  parentCategories?: Array<string>;
}
