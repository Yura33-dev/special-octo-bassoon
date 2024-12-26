import mongoose, { models, model } from 'mongoose';

import { ICategoryApi } from '@/types';

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
  },
  { timestamps: true, versionKey: false }
);

const Category =
  models?.Category || model<ICategoryApi>('Category', categorySchema);

export default Category;
