import { ICategoryApi, ICategory } from './interfaces/category.interfaces';
import {
  IPackagingApi,
  IPackaging,
  ITranslatedPackagingData,
} from './interfaces/packaging.interfaces';
import { IPage, ITranslatedPageData } from './interfaces/pages.interfaces';
import { IPagination } from './interfaces/pagination.interfaces';
import {
  IProductApi,
  IProduct,
  ITranslatedData,
  IMetaData,
} from './interfaces/product.interfaces';
import {
  ISettingsApi,
  ISettings,
  ITranslatedSettingsData,
} from './interfaces/settings.interfaces';
import {
  ISlideApi,
  ISlide,
  ITranslatedSlideData,
  IFilteredSlide,
} from './interfaces/slide.interfaces';
import { locale } from './types/global.types';

export type {
  ICategoryApi,
  ICategory,
  IProductApi,
  IProduct,
  ITranslatedData,
  IMetaData,
  IPackagingApi,
  IPackaging,
  ITranslatedPackagingData,
  IPagination,
  ISlideApi,
  ISlide,
  IPage,
  ITranslatedPageData,
  ITranslatedSlideData,
  IFilteredSlide,
  ISettingsApi,
  ISettings,
  ITranslatedSettingsData,
};
export type { locale };
