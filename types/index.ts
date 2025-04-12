import {
  ICategoryApi,
  ICategoryPopulated,
  ICategoryMapped,
  ICategory,
  IMappedNestedCategories,
  IEditCategoryFormField,
  IEditCategoryStructured,
  ICreateCategoryFormField,
  ICreateCategoryStructured,
} from './interfaces/category.interfaces';
import {
  IFilterApi,
  IFilter,
  IFilterInProductApi,
  IFilterInProductPopulated,
  IFilterInProductMapped,
  IFilterInProduct,
  ICreateFilterFormField,
  IFilterMapped,
  IFilterPopulated,
} from './interfaces/filter.interfaces';
import {
  IOrderApi,
  IProductInOrderApi,
  IOrder,
  IProductInOrder,
} from './interfaces/order.interfaces';
import {
  IPackagingApi,
  IPackagingPopulated,
  IPackagingMapped,
  ITranslatedPackagingData,
  IProductPackVariantsApi,
  IProductPackVariantsPopulated,
  IProductPackVariantsMapped,
  ICreatePackagingFormField,
  ICreatePackagingStructured,
  IPackaginInProduct,
} from './interfaces/packaging.interfaces';
import {
  IPageApi,
  ITranslatedPageData,
  IPage,
} from './interfaces/pages.interfaces';
import { IPagination } from './interfaces/pagination.interfaces';
import {
  IProducerApi,
  IProducerPopulated,
  IProducerMapped,
  IProducerForm,
} from './interfaces/producer.interfaces';
import {
  IProductApi,
  IProductPopulated,
  IProductMapped,
  IProduct,
  ITranslatedData,
  IMetaData,
  IProductForm,
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
  ICategoryPopulated,
  ICategoryMapped,
  ICategory,
  ICreateCategoryFormField,
  ICreateCategoryStructured,
  IMappedNestedCategories,
  IEditCategoryFormField,
  IEditCategoryStructured,
  IProductApi,
  IProductPopulated,
  IProductMapped,
  IProduct,
  IProductPackVariantsApi,
  ITranslatedData,
  IMetaData,
  IPackagingApi,
  IPackagingPopulated,
  IPackagingMapped,
  IProductPackVariantsPopulated,
  IProductPackVariantsMapped,
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
  IFilterPopulated,
  IFilterMapped,
  IFilter,
  IFilterInProductApi,
  IFilterInProductPopulated,
  IFilterInProductMapped,
  IFilterInProduct,
  IOrderApi,
  IOrder,
  IProductInOrderApi,
  IProductInOrder,
  ICreatePackagingFormField,
  ICreatePackagingStructured,
  ICreateFilterFormField,
  IProductForm,
  IPackaginInProduct,
  IProducerApi,
  IProducerPopulated,
  IProducerMapped,
  IProducerForm,
};
export type { locale };
