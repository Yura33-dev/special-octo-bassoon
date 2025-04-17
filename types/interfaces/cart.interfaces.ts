import { ICategoryMapped } from './category.interfaces';
import { IProducerMapped } from './producer.interfaces';

export interface IProductInCart {
  id: string;
  producer: IProducerMapped;
  imgUrl: string;
  translatedData: {
    [locale: string]: {
      name: string;
      slug: string;
    };
  };
  categories: Array<ICategoryMapped>;
  packVariant: {
    packId: {
      id: string;
      translatedData: {
        [locale: string]: {
          type: string;
          measureIn: string;
          measureValue: number;
        };
      };
      showPricePerUnit: boolean;
    };
    price: number;
    orderedQuantity: number;
  };
}
