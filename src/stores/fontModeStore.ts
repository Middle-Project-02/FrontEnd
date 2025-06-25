import { create } from 'zustand';

interface FontModeState {
  fontMode: boolean;
  setFontMode: (fontMode: boolean) => void;
}

const useFontModeStore = create<FontModeState>((set) => ({
  fontMode: false,
  setFontMode: (fontMode: boolean) => set({ fontMode }),
}));

export default useFontModeStore;
