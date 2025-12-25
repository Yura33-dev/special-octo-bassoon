import dbConnect from '@/lib/db';
import { Product } from '@/models';
import { IProducerPopulated, locale } from '@/types';

export async function getProducersFromProducts(
  locale: locale,
  filter: object = {}
): Promise<{
  slug: string;
  title: string;
  variants: { slug: string; title: string }[];
}> {
  try {
    await dbConnect();

    const products = await Product.find(filter)
      .select('producer')
      .populate('producer')
      .lean<Array<{ producer: IProducerPopulated | null }>>()
      .exec();

    const producersMap = new Map<string, { slug: string; title: string }>();

    products.forEach(({ producer }) => {
      if (
        producer &&
        producer.slug &&
        producer.translatedData?.[locale]?.title
      ) {
        if (!producersMap.has(producer.slug)) {
          producersMap.set(producer.slug, {
            slug: producer.slug,
            title: producer.translatedData[locale].title,
          });
        }
      }
    });

    const extractedProducers = Array.from(producersMap.values()).toSorted(
      (a, b) => a.title.localeCompare(b.title)
    );

    return {
      slug: 'producer',
      title: locale === 'uk' ? 'Виробник' : 'Производитель',
      variants: extractedProducers,
    };
  } catch (e) {
    console.error('Fail to fetch Producers from Products', e);
    return {
      slug: 'producer',
      title: locale === 'uk' ? 'Виробник' : 'Производитель',
      variants: [],
    };
  }
}
