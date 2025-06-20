import type { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalState {
  modal: ReactNode;
  setModal: (modal: ReactNode) => void;
  removeModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  modal: null,
  setModal: (modal) => set({ modal }),
  removeModal: () => set({ modal: null }),
}));

export default useModalStore;
