import mongoose, { models, model } from 'mongoose';

import { ICategoryApi, ISEO } from '@/types';

const metaDataSchema = new mongoose.Schema<ISEO>(
  {
    title: { type: String, default: null },
    description: { type: String, default: null },
    keywords: { type: String, default: null },
    seoText: { type: String, default: null },
  },
  { _id: false }
);

const categorySchema = new mongoose.Schema<ICategoryApi>(
  {
    name: {
      type: Map,
      of: String,
      required: true,
    },
    slug: {
      type: Map,
      of: String,
      required: true,
    },
    main: {
      type: Boolean,
      default: false,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: true,
    },
    parentCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    childCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    meta: { type: Map, of: metaDataSchema, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Category =
  models?.Category || model<ICategoryApi>('Category', categorySchema);

export default Category;
