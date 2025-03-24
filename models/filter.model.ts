import mongoose, { model, models } from 'mongoose';

import { IFilterApi } from '@/types';

const translatedFilterSchema = new mongoose.Schema<{ filterTitle: string }>({
  filterTitle: { type: String, required: true },
});

const translatedVariantSchema = new mongoose.Schema<{ variantTitle: string }>({
  variantTitle: { type: String, required: true },
});

const filterSchema = new mongoose.Schema<IFilterApi>(
  {
    slug: { type: String, required: true, unique: true },
    translatedData: { type: Map, of: translatedFilterSchema, required: true },
    variants: [
      {
        variantSlug: { type: String, required: true },
        translatedData: {
          type: Map,
          of: translatedVariantSchema,
          required: true,
        },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Filter = models?.Filter || model<IFilterApi>('Filter', filterSchema);

export default Filter;
