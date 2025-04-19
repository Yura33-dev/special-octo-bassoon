import {
  IFilterInProductMapped,
  IFilterInProductPopulated,
  IFilterMapped,
  IFilterPopulated,
} from '@/types';

export function mapFilter(filter: IFilterPopulated): IFilterMapped {
  return {
    id: filter._id.toString(),
    slug: filter.slug,
    translatedData: filter.translatedData,
    variants: filter.variants.map(variant => ({
      variantSlug: variant.variantSlug,
      translatedData: variant.translatedData,
    })),
    createdAt: new Date(filter.createdAt).toISOString() ?? null,
    updatedAt: new Date(filter.updatedAt).toISOString() ?? null,
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
      variants: filter.filter.variants.map(variant => ({
        variantSlug: variant.variantSlug,
        translatedData: variant.translatedData,
      })),
    },
    value: filter.value,
  };
}
