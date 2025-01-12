export interface IPage {
  name: string;
  translatedData: { [key: string]: ITranslatedPageData };
}

export interface ITranslatedPageData {
  h1: string;
}
