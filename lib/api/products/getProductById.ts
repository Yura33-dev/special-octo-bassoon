'use server';

import { DB_CONNECTION_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Product } from '@/models';
import { IProduct, IProductApi } from '@/types';

export async function getProductById(productId: string, locale: string) {
  const connection = await dbConnect();

  if (!connection) {
    throw new Error(DB_CONNECTION_FAILED);
  }

  const product = await Product.findOne({ _id: productId })
    .populate('categories')
    .populate('packaging')
    .lean<IProductApi>();

  if (product) {
    const mappedProduct: IProduct = {
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
      },
      packaging: product.packaging
        .map(pack => ({
          id: pack._id.toString(),
          inStock: pack.inStock,
          price: pack.price,
          quantity: pack.quantity,
          default: pack.default,
          data: {
            type: pack.translatedData[locale].type,
            measureIn: pack.translatedData[locale].measureIn,
            measureValue: pack.translatedData[locale].measureValue,
          },
        }))
        .toSorted((first, second) => first.price - second.price),
      categories: product.categories.map(category => ({
        id: category._id.toString(),
        name: category.name[locale],
        slug: category.slug[locale],
        main: category.main,
      })),
      visible: product.visible,
      producer: product.producer,
      labels: product.labels,
      imgUrl: product.imgUrl,
    };

    return mappedProduct;
  }
}
