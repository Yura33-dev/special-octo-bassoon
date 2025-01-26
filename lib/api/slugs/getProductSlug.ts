import { DB_CONNECTION_FAILED } from '@/lib/constants';
import dbConnect from '@/lib/db';
import { Product } from '@/models';
import { IProductApi, locale } from '@/types';

export async function getProductSlug(
  slug: string | null,
  currentLocale: locale,
  targetLocale: locale
): Promise<string | null> {
  const connection = await dbConnect();

  if (!connection) {
    throw new Error(DB_CONNECTION_FAILED);
  }

  if (!slug) return null;

  const product = await Product.findOne({
    [`translatedData.${currentLocale}.slug`]: slug,
  })
    .populate('categories')
    .populate('packaging')
    .lean<IProductApi>();

  if (product) {
    return product.translatedData[targetLocale].slug;
  } else {
    return null;
  }
}
