import { Document } from 'mongoose';

export interface IPageApi extends Document {
  name: string;
  translatedData: Map<string, ITranslatedPageData>;
}

export interface IPageLeaned {
  name: string;
  translatedData: { [locale: string]: ITranslatedPageData };
}

export interface ITranslatedPageData {
  h1: string;
  breadcrumbTitles: Array<string>;
  slug: string;
  meta: ISEOPageData;
}

export interface ISEOPageData {
  title: string;
  description: string;
  keywords: string | null;
  image: string;
}
