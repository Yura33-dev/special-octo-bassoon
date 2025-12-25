import { IProducerMapped, IProducerPopulated } from '@/types';

export function mapProducer(
  producer: IProducerPopulated | null | undefined
): IProducerMapped {
  if (!producer) {
    return {
      id: 'unknown-id',
      slug: 'ne-vstanovleno',
      translatedData: {
        uk: { title: 'Невідомий' },
        ru: { title: 'Неизвестный' },
      },
      currency: null,
      exchangeRate: null,
      updatedAt: 'Дата невідома',
      createdAt: 'Дата невідома',
    };
  }

  return {
    id: producer._id.toString() ?? 'unknown-id',
    slug: producer.slug ?? 'ne-vstanovleno',
    translatedData: producer.translatedData,
    currency: producer.currency,
    exchangeRate: producer.exchangeRate,
    updatedAt: producer.updatedAt
      ? new Date(producer.updatedAt).toISOString()
      : 'Дата невідома',
    createdAt: producer.createdAt
      ? new Date(producer.createdAt).toISOString()
      : 'Дата невідома',
  };
}
