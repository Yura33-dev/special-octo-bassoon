import { Document } from 'mongoose';

export interface IPageApi extends Document {
  name: string;
  translatedData: { [key: string]: ITranslatedPageData };
}

export interface ITranslatedPageData {
  h1: string;
  breadcrumbTitles: Array<string>;
  slug: string;
}

export interface IPage {
  name: string;
  data: ITranslatedPageData;
}
