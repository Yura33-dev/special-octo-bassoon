'use server';

import { PAGE_FETCH_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Page } from '@/models';
import { IPageLeaned } from '@/types';

export async function getPageDataByName(
  page: string
): Promise<IPageLeaned | null> {
  try {
    await dbConnect();

    const data = await Page.findOne({ name: page }).lean<IPageLeaned>();

    if (!data) {
      console.error(`Error: ${PAGE_FETCH_FAILED}`);
      return null;
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return null;
    } else {
      console.error(`Error: ${PAGE_FETCH_FAILED}. ${error}`);
      return null;
    }
  }
}
