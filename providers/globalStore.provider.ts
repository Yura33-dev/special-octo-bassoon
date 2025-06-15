import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IGlobalStore {
  isMobileMenuOpen: boolean;
  mobileMenuOpen: () => void;
  mobileMenuClose: () => void;
  isCategoriesListOpen: boolean;
  setCategoriesListOpen: (value: boolean) => void;
  toggleCategoriesList: () => void;
}
export const useGlobalStore = create<IGlobalStore>()(
  devtools(set => ({
    isMobileMenuOpen: false,
    mobileMenuOpen: () => set(state => ({ ...state, isMobileMenuOpen: true })),
    mobileMenuClose: () =>
      set(state => ({ ...state, isMobileMenuOpen: false })),
    isCategoriesListOpen: true,
    setCategoriesListOpen: value =>
      set(state => ({ ...state, isCategoriesListOpen: value })),
    toggleCategoriesList: () =>
      set(state => ({
        ...state,
        isCategoriesListOpen: !state.isCategoriesListOpen,
      })),
  }))
);
