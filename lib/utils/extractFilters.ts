import { IProductMapped, locale } from '@/types';

export function extractFilters(
  products: Array<IProductMapped>,
  locale: locale
): Array<{
  slug: string;
  title: string;
  variants: Array<{ slug: string; title: string }>;
}> {
  if (!Array.isArray(products)) return [];

  const filtersMap = new Map<
    string,
    { slug: string; title: string; variants: Map<string, string> }
  >();

  products.forEach(({ filters }) => {
    if (filters) {
      filters.forEach(item => {
        if (!filtersMap.has(item.filter.slug)) {
          filtersMap.set(item.filter.slug, {
            slug: item.filter.slug,
            title: item.filter.translatedData[locale].filterTitle,
            variants: new Map(),
          });
        }

        const createFilter = filtersMap.get(item.filter.slug)!;

        const matchedVariant = item.filter.variants.find(
          v => v.variantSlug === item.value
        );
        if (
          matchedVariant &&
          !createFilter.variants.has(matchedVariant.variantSlug)
        ) {
          createFilter.variants.set(
            matchedVariant.variantSlug,
            matchedVariant.translatedData[locale].variantTitle
          );
        }
      });
    }
  });

  return (
    Array.from(filtersMap.values())
      .map(filter => ({
        slug: filter.slug,
        title: filter.title,
        variants: Array.from(filter.variants.entries())
          .map(([slug, title]) => ({
            slug,
            title,
          }))
          .toSorted((a, b) => a.title.localeCompare(b.title)),
      }))
      .toSorted((first, second) => first.title.localeCompare(second.title)) ||
    []
  );
}
