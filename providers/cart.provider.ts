import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface IProduct {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imgUrl: string;
  pack: string;
}

interface ICartStore {
  cart: Array<IProduct>;
  isCartOpen: boolean;
  cartOpen: () => void;
  cartClose: () => void;
  increaseProductQuantity: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  addProduct: (product: IProduct) => void;
  removeProduct: (productId: string) => void;
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

      increaseProductQuantity: (productId: string) =>
        set(state => ({
          ...state,
          cart: state.cart.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      decreaseProductQuantity: (productId: string) =>
        set(state => ({
          ...state,
          cart: state.cart.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        })),

      addProduct: (product: IProduct) =>
        set(state => {
          const index = state.cart.findIndex(item => item.id === product.id);

          if (index > -1) {
            return {
              ...state,
              cart: state.cart.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
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

      removeProduct: (productId: string) =>
        set(state => ({
          ...state,
          cart: state.cart.filter(item => item.id !== productId),
        })),

      getTotalPrice: () => {
        return get().cart.reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0);
      },

      getTotalItems: () => {
        return get().cart.reduce((total, product) => {
          return total + product.quantity;
        }, 0);
      },
    })),

    {
      name: 'cart-storage',
      partialize: state => ({ cart: state.cart }),
    }
  )
);
