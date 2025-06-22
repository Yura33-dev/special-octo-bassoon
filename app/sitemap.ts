import { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';
import { getAllCategories, getAllProducts } from '@/lib/api';
import { config } from '@/lib/config';
import dbConnect from '@/lib/db';

interface ISiteMap {
  url: string;
  lastModified: string | Date;
  changeFrequency:
    | 'always'
    | 'never'
    | 'weekly'
    | 'monthly'
    | 'hourly'
    | 'daily'
    | 'yearly'
    | undefined;
  priority: number;
  alternates: {
    languages: {
      uk: string;
      ru: string;
    };
  };
}

export const revalidate = 3600 * 12;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect();

  const { products } = await getAllProducts();
  const categories = await getAllCategories();

  // home
  const homeEntries: ISiteMap[] = routing.locales.map(locale => ({
    url: `${config.NEXT_PUBLIC_APP_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
    alternates: {
      languages: {
        uk: `${config.NEXT_PUBLIC_APP_URL}/uk`,
        ru: `${config.NEXT_PUBLIC_APP_URL}/ru`,
      },
    },
  }));

  // catalog
  const catalogSiteMapEntites: ISiteMap[] = routing.locales.map(locale => ({
    url: `${config.NEXT_PUBLIC_APP_URL}/${locale}/catalog`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
    alternates: {
      languages: {
        uk: `${config.NEXT_PUBLIC_APP_URL}/uk/catalog`,
        ru: `${config.NEXT_PUBLIC_APP_URL}/ru/catalog`,
      },
    },
  }));

  // categories
  const categoriesSiteMapEntities: ISiteMap[] = categories.flatMap(category => {
    const linksData: Record<(typeof routing.locales)[number], string> =
      {} as Record<(typeof routing.locales)[number], string>;

    for (const locale of routing.locales) {
      linksData[locale] = category.main
        ? `${config.NEXT_PUBLIC_APP_URL}/${locale}/catalog/${category.slug[locale]}`
        : `${config.NEXT_PUBLIC_APP_URL}/${locale}/catalog/${category.parentCategories[0].slug[locale]}/${category.slug[locale]}`;
    }

    return routing.locales.map(locale => ({
      url: linksData[locale],
      lastModified: new Date(category.updatedAt ?? new Date()),
      changeFrequency: 'weekly',
      priority: 0.5,
      alternates: {
        languages: {
          uk: linksData.uk,
          ru: linksData.ru,
        },
      },
    }));
  });

  // products
  const productsSiteMapEntities: ISiteMap[] = products.flatMap(product => {
    const linksData: Record<(typeof routing.locales)[number], string> =
      {} as Record<(typeof routing.locales)[number], string>;

    for (const locale of routing.locales) {
      linksData[locale] =
        `${config.NEXT_PUBLIC_APP_URL}/${locale}/catalog/${product.categories[0].slug[locale]}/${product.categories[1].slug[locale]}/${product.translatedData[locale].slug}`;
    }

    return routing.locales.map(locale => ({
      url: linksData[locale],
      lastModified: new Date(product.updatedAt ?? new Date()),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          uk: linksData.uk,
          ru: linksData.ru,
        },
      },
    }));
  });

  //
  return [
    ...homeEntries,
    ...catalogSiteMapEntites,
    ...categoriesSiteMapEntities,
    ...productsSiteMapEntities,
  ];
}
