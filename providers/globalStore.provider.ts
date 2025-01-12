import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IGlobalStore {
  isMobileMenuOpen: boolean;
  mobileMenuOpen: () => void;
  mobileMenuClose: () => void;
  isCategoriesListOpen: boolean;
  categoriesListOpen: () => void;
  categoriesListClose: () => void;
  categoriesListToggle: () => void;
}
export const useGlobalStore = create<IGlobalStore>()(
  devtools(set => ({
    isMobileMenuOpen: false,
    mobileMenuOpen: () => set(state => ({ ...state, isMobileMenuOpen: true })),
    mobileMenuClose: () =>
      set(state => ({ ...state, isMobileMenuOpen: false })),
    isCategoriesListOpen: true,
    categoriesListOpen: () =>
      set(state => ({ ...state, isCategoriesListOpen: true })),
    categoriesListClose: () =>
      set(state => ({ ...state, isCategoriesListOpen: false })),
    categoriesListToggle: () =>
      set(state => ({
        ...state,
        isCategoriesListOpen: !state.isCategoriesListOpen,
      })),
  }))
);
