import { ICategoryApi, ICategory } from './interfaces/category.interfaces';
import {
  IFilterApi,
  IFilterInProductApi,
  IFilterInProduct,
} from './interfaces/filter.interfaces';
import {
  IPackagingApi,
  IPackaging,
  ITranslatedPackagingData,
  IProductPackVariants,
  IProductPack,
  IProductPackVariantsApi,
} from './interfaces/packaging.interfaces';
import {
  IPageApi,
  ITranslatedPageData,
  IPage,
} from './interfaces/pages.interfaces';
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
  IProductPackVariantsApi,
  ITranslatedData,
  IMetaData,
  IPackagingApi,
  IPackaging,
  IProductPackVariants,
  IProductPack,
  ITranslatedPackagingData,
  IPagination,
  ISlideApi,
  ISlide,
  IPageApi,
  IPage,
  ITranslatedPageData,
  ITranslatedSlideData,
  IFilteredSlide,
  ISettingsApi,
  ISettings,
  ITranslatedSettingsData,
  IFilterApi,
  IFilterInProductApi,
  IFilterInProduct,
};
export type { locale };
