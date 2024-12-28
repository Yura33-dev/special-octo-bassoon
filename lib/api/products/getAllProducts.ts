'use server';

import { DB_CONNECTION_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { calculatePaginationData } from '@/lib/utils';
import { Product } from '@/models';
import { IProduct, IProductApi, locale } from '@/types';

export async function getAllProducts(
  page: number = 1,
  locale: locale,
  limit: number = 10
) {
  const connection = await dbConnect();

  if (!connection) {
    throw new Error(DB_CONNECTION_FAILED);
  }

  const skip = (page - 1) * limit;

  const productsQuery = Product.find();

  const [productsCount, products] = await Promise.all([
    Product.find().merge(productsQuery).countDocuments(),
    productsQuery
      // .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate('categories')
      .lean<Array<IProductApi>>()
      .exec(),
  ]);

  const paginationData = calculatePaginationData(productsCount, limit, page);

  const mappedProducts: Array<IProduct> = products.map(product => ({
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
        type: pack.type,
        measurements: {
          measureIn: pack.measurements.measureIn,
          measureValue: pack.measurements.measureValue,
        },
        inStock: pack.inStock,
        price: pack.price,
        quantity: pack.quantity,
        default: pack.default,
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
  }));

  return { products: mappedProducts, paginationData };
}
