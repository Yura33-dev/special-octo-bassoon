import mongoose, { model, models } from 'mongoose';

import {
  IFilterApi,
  IMetaData,
  IProductApi,
  IProductPackVariantsApi,
  ITranslatedData,
} from '@/types';

const metaSchema = new mongoose.Schema<IMetaData>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: String, required: false, default: null },
  },
  { _id: false }
);

const translatedDataSchema = new mongoose.Schema<ITranslatedData>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: false, default: null },
    country: { type: String, required: false, default: null },
    meta: { type: metaSchema, required: true },
  },
  { _id: false }
);

const packagingSchema = new mongoose.Schema<IProductPackVariantsApi>(
  {
    default: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Packaging',
      required: true,
    },
    items: [
      {
        packId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Packaging',
          required: true,
        },
        quantity: { type: Number, default: null },
        price: { type: Number, required: true },
      },
    ],
  },
  { _id: false }
);

const productFiltersSchema = new mongoose.Schema<{
  id: string;
  filter: IFilterApi;
  value: string;
}>(
  {
    id: { type: String, requered: true },
    filter: { type: mongoose.Schema.Types.ObjectId, ref: 'Filter' },
    value: { type: String, requred: true },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema<IProductApi>(
  {
    translatedData: {
      type: Map,
      of: translatedDataSchema,
      required: true,
    },
    packaging: {
      type: packagingSchema,
      required: true,
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    visible: { type: Boolean, required: false, default: true },
    producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer' },
    labels: [{ type: String, enum: ['top', 'sale'], default: [] }],
    imgUrl: { type: String, required: true },
    filters: [{ type: productFiltersSchema, default: null }],
  },
  { timestamps: true, versionKey: false }
);

const Product = models?.Product || model<IProductApi>('Product', productSchema);

export default Product;
