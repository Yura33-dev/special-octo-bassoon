import mongoose, { model, models } from 'mongoose';

import { ISlideApi, ITranslatedSlideData } from '@/types';

const translatedSlideDataSchema = new mongoose.Schema<ITranslatedSlideData>(
  {
    image: { type: String, default: null },
    linkTo: { type: String, default: null },
    visible: { type: Boolean, default: true },
    name: {
      type: String,
      default: null,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const slideSchema = new mongoose.Schema<ISlideApi>(
  {
    translatedData: {
      type: Map,
      of: translatedSlideDataSchema,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Slide = models?.Slide || model<ISlideApi>('Slide', slideSchema);

export default Slide;
