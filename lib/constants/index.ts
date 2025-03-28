import {
  CATEGORIES_FETCH_FAILED,
  PARENT_CATEGORY_FETCH_FAILED,
  CATEGORY_BY_SLUG_FETCH_FAILED,
  SMTH_WENT_WRONG,
  PRODUCTS_FETCH_FAILED,
  PRODUCT_FETCH_FAILED,
  LATEST_PRODUCTS_FETCH_FAILED,
  PRODUCTS_BY_CATEGORY_ID_FAILED,
  DB_CONNECTION_FAILED,
  CART_FETCH_FAILED,
  SLIDES_FETCH_FAILED,
  PAGE_FETCH_FAILED,
  SETTINGS_FETCH_FAILED,
  PACKAGING_FETCH_FAILED,
  FILTERS_FETCH_FAILED,
  ORDERS_FETCH_FAILED,
} from './api.constants';
import {
  SUCCESS_ORDER_ID,
  ADD_CATEGORY_ID,
  ADD_SUBCATEGORY_ID,
  DELETE_CATEGORY_ID,
  ADD_PACKAGING_ID,
  DELETE_PACKAGING_ID,
  ADD_FILTER_ID,
  DELETE_FILTER_ID,
} from './modal.constant';
import { SLUG_REGEXP } from './regexp.constant';
import {
  MANDATORY_FIELD,
  INCORRECT_EMAIL,
  INCORRECT_PHONE,
  INCORRECT_NAME,
  INCORRECT_POST,
  INCORRECT_SURNAME,
  INCORRECT_FATHERNAME,
  INCORRECT_ZIP,
  INCORRECT_SLUG,
  MIN_LENGTH,
} from './validation.constant';

export {
  CATEGORIES_FETCH_FAILED,
  PARENT_CATEGORY_FETCH_FAILED,
  CATEGORY_BY_SLUG_FETCH_FAILED,
  SMTH_WENT_WRONG,
  PRODUCTS_FETCH_FAILED,
  PRODUCT_FETCH_FAILED,
  LATEST_PRODUCTS_FETCH_FAILED,
  PRODUCTS_BY_CATEGORY_ID_FAILED,
  DB_CONNECTION_FAILED,
  CART_FETCH_FAILED,
  SLIDES_FETCH_FAILED,
  PAGE_FETCH_FAILED,
  SETTINGS_FETCH_FAILED,
  PACKAGING_FETCH_FAILED,
  SUCCESS_ORDER_ID,
  ADD_CATEGORY_ID,
  MANDATORY_FIELD,
  INCORRECT_EMAIL,
  INCORRECT_PHONE,
  INCORRECT_NAME,
  INCORRECT_POST,
  INCORRECT_SURNAME,
  INCORRECT_FATHERNAME,
  INCORRECT_ZIP,
  MIN_LENGTH,
  INCORRECT_SLUG,
  SLUG_REGEXP,
  FILTERS_FETCH_FAILED,
  ORDERS_FETCH_FAILED,
  ADD_SUBCATEGORY_ID,
  DELETE_CATEGORY_ID,
  ADD_PACKAGING_ID,
  DELETE_PACKAGING_ID,
  ADD_FILTER_ID,
  DELETE_FILTER_ID,
};
