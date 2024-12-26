import mongoose, { model, models } from 'mongoose';

import {
  IMeasurements,
  IMetaData,
  IPackaging,
  IProductApi,
  ITranslatedData,
} from '@/types';

const metaSchema = new mongoose.Schema<IMetaData>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  keywords: { type: String, required: false, default: null },
});

const translatedDataSchema = new mongoose.Schema<ITranslatedData>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String, required: false, default: null },
  country: { type: String, required: false, default: null },
  meta: { type: metaSchema, required: true },
});

const measurementsSchema = new mongoose.Schema<IMeasurements>({
  measureIn: { type: String, required: true },
  measureValue: { type: Number, required: true },
});

const packagingSchema = new mongoose.Schema<IPackaging>({
  type: { type: String, required: true },
  measurements: { type: measurementsSchema, required: true },
  inStock: {
    type: String,
    enum: ['inStock', 'outStock', 'preOrder'],
    required: true,
  },
  price: { type: Number, required: true },
  quantity: { type: Number, required: false, default: null },
  default: { type: Boolean, required: false, default: false },
});

const productSchema = new mongoose.Schema<IProductApi>(
  {
    translatedData: {
      type: Map,
      of: translatedDataSchema,
      required: true,
    },
    packaging: [{ type: packagingSchema, required: true }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    visible: { type: Boolean, required: false, default: true },
    producer: { type: String, required: true },
    labels: [
      { type: String, enum: ['top', 'sale'], required: false, default: [] },
    ],
    imgUrl: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Product = models?.Product || model<IProductApi>('Product', productSchema);

export default Product;
