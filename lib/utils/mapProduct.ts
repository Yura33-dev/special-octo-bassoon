import { IProductMapped, IProductPopulated } from '@/types';

import { mapCategory } from './mapCategory';
import { mapFilterInProduct } from './mapFilter';
import { mapPackagingInProduct } from './mapPackaging';
import { mapProducer } from './mapProducer';

export function mapProduct(product: IProductPopulated): IProductMapped {
  return {
    id: product._id.toString(),
    translatedData: product.translatedData,
    packaging: mapPackagingInProduct(product.packaging),
    categories: product.categories.map(category => mapCategory(category)),
    visible: product.visible,
    labels: product.labels,
    imgUrl: product.imgUrl,
    filters: product.filters.map(filter => mapFilterInProduct(filter)),
    producer: mapProducer(product.producer),
  };
}
