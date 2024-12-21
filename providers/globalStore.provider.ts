import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ICategory, locale } from '@/types';

interface IGlobalStore {
  isMobileMenuOpen: boolean;
  categories: Array<ICategory>;
  fetchCategories: (locale: locale) => void;
  categoriesAreLoading: boolean;
  mobileMenuOpen: () => void;
  mobileMenuClose: () => void;
}
export const useGlobalStore = create<IGlobalStore>()(
  devtools(set => ({
    isMobileMenuOpen: false,
    categories: [],
    categoriesAreLoading: true,
    fetchCategories: async (locale: locale) => {
      try {
        const response = await fetch(`/api/categories?locale=${locale}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const categories: Array<ICategory> = await response.json();
        set(state => ({ ...state, categories }));
      } catch (error: unknown) {
        console.error(error);
      } finally {
        set(state => ({ ...state, categoriesAreLoading: false }));
      }
    },
    mobileMenuOpen: () => set(state => ({ ...state, isMobileMenuOpen: true })),
    mobileMenuClose: () =>
      set(state => ({ ...state, isMobileMenuOpen: false })),
  }))
);
