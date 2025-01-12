import mongoose, { model, models } from 'mongoose';

import { IPage, ITranslatedPageData } from '@/types';

const translatedPageDataSchema = new mongoose.Schema<ITranslatedPageData>({
  h1: { type: String, required: true },
});

const pageSchema = new mongoose.Schema<IPage>(
  {
    name: { type: String, required: true },
    translatedData: {
      type: Map,
      of: translatedPageDataSchema,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Page = models?.Page || model<IPage>('Page', pageSchema);

export default Page;
