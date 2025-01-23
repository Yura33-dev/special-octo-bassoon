import mongoose, { model, models } from 'mongoose';

import { IPackagingApi, ITranslatedPackagingData } from '@/types';

const translatedPackagingSchema = new mongoose.Schema<ITranslatedPackagingData>(
  {
    type: { type: String, required: true },
    measureIn: { type: String, required: true },
    measureValue: { type: Number, required: true },
  }
);

const packagingSchema = new mongoose.Schema<IPackagingApi>(
  {
    translatedData: {
      type: Map,
      of: translatedPackagingSchema,
      required: true,
    },
    inStock: {
      type: String,
      enum: ['inStock', 'outStock', 'preOrder'],
      required: true,
    },
    price: { type: Number, required: true },
    quantity: { type: Number, default: null },
    default: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

const Packaging =
  models?.Packaging || model<IPackagingApi>('Packaging', packagingSchema);

export default Packaging;
