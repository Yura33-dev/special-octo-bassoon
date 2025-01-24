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
      siteName: setting.siteName,
      translatedData: {
        slogan: setting.translatedData[locale].slogan,
        deliveryProductMethods:
          setting.translatedData[locale].deliveryProductMethods,
        paymentProductMethods:
          setting.translatedData[locale].paymentProductMethods,
        refundProductMethod: setting.translatedData[locale].refundProductMethod,
      },
    }));

    return mappedSettings;
  } catch (error) {
    throw new Error(`Error: ${SETTINGS_FETCH_FAILED}. ${error}`);
  }
}
