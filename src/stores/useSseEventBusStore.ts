import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type EventCallback = (data: string) => void;

interface SseEventBusState {
  listeners: Map<string, Set<EventCallback>>;
  emit: (event: string, data: string) => void;
  on: (event: string, callback: EventCallback) => void;
  off: (event: string, callback: EventCallback) => void;
  clearAll: () => void;
}

const useSseEventBusStore = create<SseEventBusState>()(
  immer((set, get) => ({
    listeners: new Map(),

    emit(event, data) {
      const cbs = get().listeners.get(event);
      if (cbs) {
        cbs.forEach((cb) => cb(data));
      }
    },

    on(event, callback) {
      set((state) => {
        if (!state.listeners.has(event)) {
          state.listeners.set(event, new Set());
        }
        state.listeners.get(event)!.add(callback);
      });
    },

    off(event, callback) {
      set((state) => {
        const cbs = state.listeners.get(event);
        if (cbs) {
          cbs.delete(callback);
          if (cbs.size === 0) {
            state.listeners.delete(event);
          }
        }
      });
    },

    clearAll() {
      set((state) => {
        state.listeners.clear();
      });
    },
  })),
);

export default useSseEventBusStore;
