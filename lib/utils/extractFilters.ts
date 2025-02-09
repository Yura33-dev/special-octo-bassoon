import { IProduct } from '@/types';

export function extractFilters(products: Array<IProduct>): Array<{
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
      filters.forEach(({ slug, title, variants, value }) => {
        if (!filtersMap.has(slug)) {
          filtersMap.set(slug, {
            slug,
            title,
            variants: new Map(),
          });
        }

        const filter = filtersMap.get(slug)!;

        const matchedVariant = variants.find(v => v.slug === value);
        if (matchedVariant && !filter.variants.has(matchedVariant.slug)) {
          filter.variants.set(matchedVariant.slug, matchedVariant.title);
        }
      });
    }
  });

  return (
    Array.from(filtersMap.values())
      .map(filter => ({
        slug: filter.slug,
        title: filter.title,
        variants: Array.from(filter.variants.entries()).map(
          ([slug, title]) => ({
            slug,
            title,
          })
        ),
      }))
      .toSorted((first, second) => first.title.localeCompare(second.title)) ||
    []
  );
}
