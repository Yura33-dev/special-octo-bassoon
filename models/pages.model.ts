import mongoose, { model, models } from 'mongoose';

import { IPageApi, ISEOPageData, ITranslatedPageData } from '@/types';

const SEOPageDataSchema = new mongoose.Schema<ISEOPageData>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: String, default: null },
    image: { type: String, default: null },
  },
  { _id: false }
);

const translatedPageDataSchema = new mongoose.Schema<ITranslatedPageData>(
  {
    h1: { type: String, required: true },
    breadcrumbTitles: { type: [String], required: true },
    slug: { type: String, required: true },
    meta: {
      type: Map,
      of: SEOPageDataSchema,
      required: true,
    },
  },
  { _id: false }
);

const pageSchema = new mongoose.Schema<IPageApi>(
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

const Page = models?.Page || model<IPageApi>('Page', pageSchema);

export default Page;
