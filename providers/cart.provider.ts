import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { getProductById } from '@/lib/api';
import { CART_FETCH_FAILED } from '@/lib/constants';
import { ICategory, IProduct, IProductPack, locale } from '@/types';

interface IPackagingWithQuantity extends IProductPack {
  orderedQuantity: number;
}

export interface IProductInCart {
  id: string;
  imgUrl: string;
  data: {
    name: string;
    slug: string;
  };
  categories: Array<Pick<ICategory, 'id' | 'name' | 'slug' | 'main'>>;
  packVariant: IPackagingWithQuantity;
}

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

      fetchProductsInCart: async (locale: locale) => {
        set(state => ({ ...state, isCartLoading: true }));

        const uniqueIds: Set<string> = new Set();
        get().cart.map(item => uniqueIds.add(item.id));
        const productIds = Array.from(uniqueIds);

        let products: Array<IProduct | undefined>;

        try {
          products = await Promise.all(
            productIds.map(id => getProductById(id, locale))
          );

          set(state => ({
            ...state,
            isCartLoading: false,
            cart: state.cart.map(item => {
              const updatedProduct = products.find(
                product => product?.id === item.id
              );

              if (updatedProduct) {
                const translatedPackVariant =
                  updatedProduct.packaging.items.find(
                    updatedPack => updatedPack.id === item.packVariant.id
                  ) ?? item.packVariant;

                return {
                  ...item,
                  data: {
                    ...item.data,
                    name: updatedProduct.data.name,
                    slug: updatedProduct.data.slug,
                  },
                  categories: updatedProduct.categories,
                  packVariant: {
                    ...translatedPackVariant,
                    orderedQuantity: item.packVariant.orderedQuantity,
                  },
                };
              }

              return item;
            }),
          }));
        } catch (e: unknown) {
          console.error(CART_FETCH_FAILED, e);
          set(state => ({ ...state, isCartLoading: false }));
        }
      },

      cleanCart: () => set(state => ({ ...state, cart: [] })),
    })),

    {
      name: 'cart-storage',
      partialize: state => ({ cart: state.cart }),
    }
  )
);
