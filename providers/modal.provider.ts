import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IModalStore {
  modals: Record<string, boolean>;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  isModalOpen: (modalId: string) => boolean;
}

export const useModalStore = create<IModalStore>()(
  devtools((set, get) => ({
    modals: {},
    openModal: (modalId: string) =>
      set(state => ({
        ...state,
        modals: { ...state.modals, [modalId]: true },
      })),
    closeModal: (modalId: string) =>
      set(state => ({
        ...state,
        modals: { ...state.modals, [modalId]: false },
      })),
    isModalOpen: (modalId: string) => !!get().modals[modalId],
  }))
);
