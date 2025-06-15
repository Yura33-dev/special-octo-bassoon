import { IProducerMapped, IProducerPopulated } from '@/types';

export function mapProducer(producer: IProducerPopulated): IProducerMapped {
  return {
    id: producer._id.toString(),
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
