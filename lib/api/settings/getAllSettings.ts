'use server';

import { SETTINGS_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Setting } from '@/models';
import { ISettingsLeaned, ISettingsMapped } from '@/types';

export async function getAllSettings(): Promise<ISettingsMapped | undefined> {
  try {
    await dbConnect();

    const settings = await Setting.find({}).lean<Array<ISettingsLeaned>>();
    if (!settings) {
      throw new Error('No settings found in DB');
    }

    const mappedSettings: ISettingsMapped = {
      id: settings[0]._id.toString(),
      siteName: settings[0].siteName,
      translatedData: settings[0].translatedData,
      contacts: settings[0].contacts,
    };

    return mappedSettings;
  } catch (error) {
    console.error(`${SETTINGS_FETCH_FAILED}: ${error}`);
  }
}
