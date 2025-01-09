import mongoose, { model, models } from 'mongoose';

import { ISlide } from '@/types';

const slideSchema = new mongoose.Schema<ISlide>(
  {
    image: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: false,
      default: true,
    },
    sortOrder: {
      type: Number,
      required: false,
      deafult: 0,
    },
    linkTo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Slide = models?.Slide || model<ISlide>('Slide', slideSchema);

export default Slide;
