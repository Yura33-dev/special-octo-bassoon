import mongoose, { model, models } from 'mongoose';

import { IMetaData, IProductApi, ITranslatedData } from '@/types';

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

const productSchema = new mongoose.Schema<IProductApi>(
  {
    translatedData: {
      type: Map,
      of: translatedDataSchema,
      required: true,
    },
    packaging: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Packaging' }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    visible: { type: Boolean, required: false, default: true },
    producer: { type: String, required: true },
    labels: [{ type: String, enum: ['top', 'sale'], default: [] }],
    imgUrl: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Product = models?.Product || model<IProductApi>('Product', productSchema);

export default Product;
