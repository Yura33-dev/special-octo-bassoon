import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { IPackaging } from '@/types';

interface IPackagingWithQuantity extends IPackaging {
  orderedQuantity: number;
}

export interface IProductInCart {
  id: string;
  imgUrl: string;
  name: string;
  slug: string;
  packVariant: IPackagingWithQuantity;
}

interface ICartStore {
  cart: Array<IProductInCart>;
  isCartOpen: boolean;
  cartOpen: () => void;
  cartClose: () => void;
  increaseProductQuantity: (packId: string) => void;
  decreaseProductQuantity: (packId: string) => void;
  addProduct: (product: IProductInCart) => void;
  removeProduct: (packId: string) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}
export const useCartStore = create<ICartStore>()(
  persist(
    devtools((set, get) => ({
      cart: [],
      isCartOpen: false,
      cartOpen: () => set(state => ({ ...state, isCartOpen: true })),
      cartClose: () => set(state => ({ ...state, isCartOpen: false })),

      increaseProductQuantity: (packId: string) =>
        set(state => ({
          ...state,
          cart: state.cart.map(item =>
            item.packVariant.id === packId
              ? {
                  ...item,
                  packVariant: {
                    ...item.packVariant,
                    orderedQuantity: item.packVariant.orderedQuantity + 1,
                  },
                }
              : item
          ),
        })),

      decreaseProductQuantity: (packId: string) =>
        set(state => ({
          ...state,
          cart: state.cart.map(item =>
            item.packVariant.id === packId
              ? {
                  ...item,
                  packVariant: {
                    ...item.packVariant,
                    orderedQuantity: item.packVariant.orderedQuantity - 1,
                  },
                }
              : item
          ),
        })),

      addProduct: (product: IProductInCart) =>
        set(state => {
          const index = state.cart.findIndex(
            item => item.packVariant.id === product.packVariant.id
          );

          if (index > -1) {
            return {
              ...state,
              cart: state.cart.map(item =>
                item.packVariant.id === product.packVariant.id
                  ? {
                      ...item,
                      packVariant: {
                        ...item.packVariant,
                        orderedQuantity: item.packVariant.orderedQuantity + 1,
                      },
                    }
                  : item
              ),
            };
          } else {
            return {
              ...state,
              cart: [...state.cart, product],
            };
          }
        }),

      removeProduct: (packId: string) =>
        set(state => ({
          ...state,
          cart: state.cart.filter(item => item.packVariant.id !== packId),
        })),

      getTotalPrice: () => {
        return get().cart.reduce((total, product) => {
          return (
            total +
            product.packVariant.price * product.packVariant.orderedQuantity
          );
        }, 0);
      },

      getTotalItems: () => {
        return get().cart.reduce((total, product) => {
          return total + product.packVariant.orderedQuantity;
        }, 0);
      },
    })),

    {
      name: 'cart-storage',
      partialize: state => ({ cart: state.cart }),
    }
  )
);
