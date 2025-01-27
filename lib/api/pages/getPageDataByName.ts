'use server';

import { DB_CONNECTION_FAILED, PAGE_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Page } from '@/models';
import { IPage, IPageApi, locale } from '@/types';

export async function getPageDataByName(
  page: string,
  locale: locale
): Promise<IPage | null> {
  try {
    const connection = await dbConnect();

    if (!connection) {
      console.error(DB_CONNECTION_FAILED);
      return null;
    }

    const data = await Page.findOne({ name: page }).lean<IPageApi>();

    if (!data) {
      console.error(`Error: ${PAGE_FETCH_FAILED}`);
      return null;
    }

    return { name: data.name, data: data.translatedData[locale] };
  } catch (error: unknown) {
    console.error(`Error: ${PAGE_FETCH_FAILED}. ${error}`);
    return null;
  }
}
