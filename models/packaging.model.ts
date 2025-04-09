import mongoose, { model, models } from 'mongoose';

import { IPackagingApi, ITranslatedPackagingData } from '@/types';

const translatedPackagingSchema = new mongoose.Schema<ITranslatedPackagingData>(
  {
    type: { type: String, required: true },
    measureIn: { type: String, required: true },
    measureValue: { type: Number, required: true },
  },
  { _id: false }
);

const packagingSchema = new mongoose.Schema<IPackagingApi>(
  {
    translatedData: {
      type: Map,
      of: translatedPackagingSchema,
      required: true,
    },
    showPricePerUnit: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

const Packaging =
  models?.Packaging || model<IPackagingApi>('Packaging', packagingSchema);

export default Packaging;
