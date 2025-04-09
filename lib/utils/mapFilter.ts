import {
  IFilterApi,
  IFilterInProductMapped,
  IFilterInProductPopulated,
  IFilterMapped,
} from '@/types';

export function mapFilter(filter: IFilterApi): IFilterMapped {
  return {
    id: filter._id.toString(),
    slug: filter.slug,
    translatedData: filter.translatedData,
    variants: filter.variants,
  };
}

export function mapFilterInProduct(
  filter: IFilterInProductPopulated
): IFilterInProductMapped {
  return {
    id: filter.id,
    filter: {
      id: filter.filter._id.toString(),
      slug: filter.filter.slug,
      translatedData: filter.filter.translatedData,
      variants: filter.filter.variants,
    },
    value: filter.value,
  };
}
