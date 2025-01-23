'use server';

import { SETTINGS_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Setting } from '@/models';
import { ISettings, ISettingsApi, locale } from '@/types';

export async function getAllSettings(
  locale: locale
): Promise<Array<ISettings>> {
  try {
    await dbConnect();

    const settings = await Setting.find({}).lean<Array<ISettingsApi>>();

    const mappedSettings: Array<ISettings> = settings.map(setting => ({
      id: setting._id.toString(),
      siteName: setting.siteName,
      translatedData: {
        slogan: setting.translatedData[locale].slogan,
      },
    }));

    return mappedSettings;
  } catch (error) {
    throw new Error(`Error: ${SETTINGS_FETCH_FAILED}. ${error}`);
  }
}
