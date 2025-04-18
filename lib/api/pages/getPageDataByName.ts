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
      throw new Error(`Error: ${PAGE_FETCH_FAILED}`);
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(`Error: ${PAGE_FETCH_FAILED}. ${error}`);
    }
  }
}
