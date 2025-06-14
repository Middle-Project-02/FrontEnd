import { User } from '@/libs/types';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type State = {
  isLoggedIn: boolean;
  user: User | null;
};

type Actions = {
  setAuth: (user: User) => void;
  clearAuth: () => void;
};

const initialState: State = {
  isLoggedIn: false,
  user: null,
};

export const useAuthStore = create<State & Actions>()(
  immer((set) => ({
    ...initialState,
    setAuth: (user: User) =>
      set((state) => {
        state.isLoggedIn = true;
        state.user = user;
      }),
    clearAuth: () =>
      set((state) => {
        state.isLoggedIn = false;
        state.user = null;
      }),
  })),
);
