import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IProductInOrderMapped } from '@/types';

interface IAdminStore {
  productsInOrder: IProductInOrderMapped[];
  totalOrderPrice: number;
  setProductsToOrder: (products: IProductInOrderMapped[]) => void;
  removeProductFromOrder: (productId: string, packId: string) => void;
  resetProducts: () => void;
}

export const useAdminStore = create<IAdminStore>()(
  devtools(set => ({
    productsInOrder: [],
    totalOrderPrice: 0,
    setProductsToOrder: products =>
      set(state => {
        const updatedProductsList = [...state.productsInOrder, ...products];

        const updatedTotalPrice = updatedProductsList.reduce(
          (total, product) => {
            return product.productId.producer.exchangeRate
              ? (total +=
                  product.price *
                  product.productId.producer.exchangeRate *
                  product.quantity)
              : (total += product.price * product.quantity);
          },
          0
        );

        return {
          productsInOrder: updatedProductsList,
          totalOrderPrice: updatedTotalPrice,
        };
      }),

    removeProductFromOrder: (productId: string, packId: string) => {
      set(state => {
        const updatedProductsList = [
          ...state.productsInOrder.filter(
            pr => !(pr.productId.id === productId && pr.packId.id === packId)
          ),
        ];

        const updatedTotalPrice = updatedProductsList.reduce(
          (total, product) => {
            return product.productId.producer.exchangeRate
              ? (total +=
                  product.price *
                  product.productId.producer.exchangeRate *
                  product.quantity)
              : (total += product.price * product.quantity);
          },
          0
        );

        return {
          productsInOrder: updatedProductsList,
          totalOrderPrice: updatedTotalPrice,
        };
      });
    },
    resetProducts: () => {
      set(state => ({ ...state, productsInOrder: [], totalOrderPrice: 0 }));
    },
  }))
);
