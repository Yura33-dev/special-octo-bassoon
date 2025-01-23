import mongoose, { model, models } from 'mongoose';

import { ISettingsApi, ITranslatedSettingsData } from '@/types';

const settingsTranslatedData = new mongoose.Schema<ITranslatedSettingsData>({
  slogan: { type: String, default: null },
});

const settingSchema = new mongoose.Schema<ISettingsApi>(
  {
    siteName: {
      type: String,
    },
    translatedData: {
      type: Map,
      of: settingsTranslatedData,
    },
  },
  { timestamps: true, versionKey: false }
);

const Setting =
  models?.Setting || model<ISettingsApi>('Setting', settingSchema);

export default Setting;
