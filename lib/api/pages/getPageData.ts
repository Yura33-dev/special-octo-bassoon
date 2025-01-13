'use server';

import { DB_CONNECTION_FAILED, PAGE_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Page } from '@/models';
import { IPage, locale } from '@/types';

export async function getPageData(page: string, locale: locale) {
  try {
    const connection = await dbConnect();

    if (!connection) {
      console.error(DB_CONNECTION_FAILED);
      return;
    }

    const data = await Page.findOne({ name: page }).lean<IPage>();
    if (!data) return console.error(`Error: ${PAGE_FETCH_FAILED}`);

    return { name: data.name, translatedData: data.translatedData[locale] };
  } catch (error: unknown) {
    console.error(`Error: ${PAGE_FETCH_FAILED}. ${error}`);
  }
}
