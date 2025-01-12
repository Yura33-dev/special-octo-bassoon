'use server';

import { DB_CONNECTION_FAILED, PAGE_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Page } from '@/models';
import { IPage, locale } from '@/types';

export async function getPageData(page: string, locale: locale) {
  try {
    const connection = await dbConnect();

    if (!connection) {
      throw new Error(DB_CONNECTION_FAILED);
    }

    const data = await Page.findOne({ name: page }).lean<IPage>();
    if (!data) throw new Error(`Error: ${PAGE_FETCH_FAILED}`);

    return { name: data.name, translatedData: data.translatedData[locale] };
  } catch (error: unknown) {
    throw new Error(`Error: ${PAGE_FETCH_FAILED}. ${error}`);
  }
}
