import { IProduct, IProductApi, locale } from '@/types';

export function mapProduct(product: IProductApi, locale: locale): IProduct {
  return {
    id: product._id.toString(),
    data: {
      name: product.translatedData[locale].name,
      slug: product.translatedData[locale].slug,
      description: product.translatedData[locale].description || 'N/A',
      country: product.translatedData[locale].country || 'N/A',
      meta: {
        title: product.translatedData[locale].meta.title,
        description: product.translatedData[locale].meta.description,
        keywords: product.translatedData[locale].meta.keywords || 'N/A',
      },
      characteristics: product.translatedData[locale].characteristics || null,
    },
    packaging: {
      default: product.packaging.default
        ? {
            id: product.packaging.default._id.toString(),
            type: product.packaging.default.translatedData[locale]?.type || '',
            measureIn:
              product.packaging.default.translatedData[locale]?.measureIn || '',
            measureValue:
              product.packaging.default.translatedData[locale]?.measureValue ||
              0,
            quantity: product.packaging.default.quantity,
            price: product.packaging.default.price,
            showPricePerUnit: product.packaging.default.showPricePerUnit,
          }
        : null,
      items: product.packaging.items.map(packItem => ({
        id: packItem.packId._id.toString() || '',
        type: packItem.packId.translatedData[locale]?.type || '',
        measureIn: packItem.packId.translatedData[locale]?.measureIn || '',
        measureValue: packItem.packId.translatedData[locale]?.measureValue || 0,
        quantity: packItem.quantity,
        price: packItem.price,
        showPricePerUnit: packItem.packId.showPricePerUnit,
      })),
    },
    categories: product.categories.map(category => ({
      id: category._id.toString(),
      name: category.name[locale],
      slug: category.slug[locale],
      main: category.main ?? false,
    })),
    visible: product.visible,
    producer: product.producer,
    labels: product.labels,
    imgUrl: product.imgUrl,
  };
}
