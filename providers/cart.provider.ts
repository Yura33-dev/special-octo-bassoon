import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { IProductInCart } from '@/types';

interface ICartStore {
  cart: Array<IProductInCart>;
  isCartOpen: boolean;
  isCartLoading: boolean;
  cartOpen: () => void;
  cartClose: () => void;
  increaseProductQuantity: (packId: string) => void;
  decreaseProductQuantity: (packId: string) => void;
  addProduct: (product: IProductInCart) => void;
  removeProduct: (packId: string) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  fetchProductsInCart: (locale: string) => void;
  cleanCart: () => void;
}
export const useCartStore = create<ICartStore>()(
  persist(
    devtools((set, get) => ({
      cart: [],
      isCartOpen: false,
      isCartLoading: false,
      cartOpen: () => set(state => ({ ...state, isCartOpen: true })),
      cartClose: () => set(state => ({ ...state, isCartOpen: false })),

      increaseProductQuantity: (packId: string) =>
        set(state => ({
          ...state,
          cart: state.cart.map(item =>
            item.packVariant.packId.id === packId
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
            item.packVariant.packId.id === packId
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
          const productsInCart = state.cart.filter(
            cartItem => cartItem.id === product.id
          );

          if (productsInCart.length > 0) {
            const isPackagingInProductExist = productsInCart.find(
              productInCart =>
                productInCart.packVariant.packId.id ===
                product.packVariant.packId.id
            );

            if (isPackagingInProductExist) {
              return {
                ...state,
                cart: state.cart.map(item =>
                  item.id === product.id &&
                  isPackagingInProductExist.packVariant.packId.id ===
                    item.packVariant.packId.id
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
          cart: state.cart.filter(
            item => item.packVariant.packId.id !== packId
          ),
        })),

      getTotalPrice: () => {
        return get().cart.reduce((total, product) => {
          const productPrice = product.producer.exchangeRate
            ? product.packVariant.price * product.producer.exchangeRate
            : product.packVariant.price;
          return total + productPrice * product.packVariant.orderedQuantity;
        }, 0);
      },

      getTotalItems: () => {
        return get().cart.reduce((total, product) => {
          return total + product.packVariant.orderedQuantity;
        }, 0);
      },

      cleanCart: () => set(state => ({ ...state, cart: [] })),
    })),

    {
      name: 'cart-storage',
      partialize: state => ({ cart: state.cart }),
    }
  )
);
