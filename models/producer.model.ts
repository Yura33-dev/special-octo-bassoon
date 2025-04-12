import mongoose, { model, models } from 'mongoose';

import { IProducerApi } from '@/types';

const translatedProducerSchema = new mongoose.Schema<{ title: string }>(
  {
    title: { type: String, required: true },
  },
  { _id: false }
);

const producerSchema = new mongoose.Schema<IProducerApi>(
  {
    translatedData: {
      type: Map,
      of: translatedProducerSchema,
      required: true,
    },
    currency: { type: String, default: null },
    exchangeRate: { type: Number, default: null },
  },
  { timestamps: true, versionKey: false }
);

const Producer =
  models?.Producer || model<IProducerApi>('Producer', producerSchema);
export default Producer;
