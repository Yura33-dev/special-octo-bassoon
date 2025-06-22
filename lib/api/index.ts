import { addNestedCategory } from './categories/addNestedCategory';
import { createCategory } from './categories/createCategory';
import { deleteCategoryById } from './categories/deleteCategoryById';
import { getAllCategories } from './categories/getAllCategories';
import { getCategoryById } from './categories/getCategoryById';
import { getCategoryBySlug } from './categories/getCategoryBySlug';
import { patchCategoryById } from './categories/patchCategoryById';
import { removeNestedCategory } from './categories/removeNestedCategory';
import { createFilter } from './filters/createFilter';
import { deleteFilterById } from './filters/deleteFilterById';
import { getAllFilters } from './filters/getAllFilters';
import { getFilterBySlug } from './filters/getFilterBySlug';
import { getFiltersFromProducts } from './filters/getFiltersFromProducts';
import { patchFilterBySlug } from './filters/patchFilterBySlug';
import { imageUploader } from './images/imageUploader';
import { archiveOrderById } from './orders/archiveOrderById';
import { createOrder } from './orders/createOrder';
import { deleteOrderById } from './orders/deleteOrderById';
import { getAllOrders } from './orders/getAllOrders';
import { getOrderById } from './orders/getOrderById';
import { patchOrderById } from './orders/patchOrderById';
import { createPackaging } from './packaging/createPackaging';
import { deletePackagingById } from './packaging/deletePackagingById';
import { getAllPackaging } from './packaging/getAllPackaging';
import { getPackagingById } from './packaging/getPackagingById';
import { patchPackagingById } from './packaging/patchPackagingById';
import { getPageDataByName } from './pages/getPageDataByName';
import { createProducer } from './producers/createProducer';
import { deleteProducerById } from './producers/deleteProducerById';
import { getAllProducers } from './producers/getAllProducers';
import { getProducerById } from './producers/getProducerById';
import { patchProducerById } from './producers/patchProducerById';
import { createProduct } from './products/createProduct';
import { deleteProductById } from './products/deleteProductById';
import { getAllProducts } from './products/getAllProducts';
import { getAllProductsByCategoryId } from './products/getAllProductsByCategoryId';
import { getLatestProducts } from './products/getLatestProducts';
import { getProductById } from './products/getProductById';
import { getProductBySlug } from './products/getProductBySlug';
import { getProductsByName } from './products/getProductsByName';
import { getProductsSiteMap } from './products/getProductsSiteMap';
import { updateProduct } from './products/updateProduct';
import { getAllSettings } from './settings/getAllSettings';
import { createSlide } from './slides/createSlide';
import { deleteSlideById } from './slides/deleteSlideById';
import { patchSlideById } from './slides/patchSlideById';
import { getCategorySlug } from './slugs/getCategorySlug';
import { getProductSlug } from './slugs/getProductSlug';

export {
  getAllProducts,
  getProductById,
  getProductBySlug,
  getProductsByName,
  getAllCategories,
  getLatestProducts,
  getAllSettings,
  getProductSlug,
  getCategorySlug,
  getPageDataByName,
  getCategoryBySlug,
  getAllProductsByCategoryId,
  getFiltersFromProducts,
  getAllPackaging,
  getAllFilters,
  getAllOrders,
  patchCategoryById,
  deleteCategoryById,
  createCategory,
  addNestedCategory,
  getCategoryById,
  removeNestedCategory,
  createPackaging,
  getPackagingById,
  deletePackagingById,
  patchPackagingById,
  createFilter,
  getFilterBySlug,
  patchFilterBySlug,
  deleteFilterById,
  createProduct,
  updateProduct,
  deleteProductById,
  getAllProducers,
  createProducer,
  getProducerById,
  patchProducerById,
  deleteProducerById,
  patchSlideById,
  createSlide,
  imageUploader,
  deleteSlideById,
  createOrder,
  getOrderById,
  patchOrderById,
  archiveOrderById,
  deleteOrderById,
  getProductsSiteMap,
};
