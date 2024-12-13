import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IGlobalStore {
  isMobileMenuOpen: boolean;
  mobileMenuOpen: () => void;
  mobileMenuClose: () => void;
}
export const useGlobalStore = create<IGlobalStore>()(
  devtools(set => ({
    isMobileMenuOpen: false,
    mobileMenuOpen: () => set(state => ({ ...state, isMobileMenuOpen: true })),
    mobileMenuClose: () =>
      set(state => ({ ...state, isMobileMenuOpen: false })),
  }))
);
