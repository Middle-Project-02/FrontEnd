import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { enableMapSet } from 'immer';
import { SseEventType, SseEventPayloadMap } from '@/types/sseEventType';

enableMapSet();

type EventHandler<T extends SseEventType> = (payload: SseEventPayloadMap[T]) => void;

interface SseEventBusState {
  listeners: Map<SseEventType, Set<EventHandler<any>>>;

  emit: <T extends SseEventType>(eventType: T, payload: SseEventPayloadMap[T]) => void;

  on: <T extends SseEventType>(eventType: T, callback: EventHandler<T>) => void;

  off: <T extends SseEventType>(eventType: T, callback: EventHandler<T>) => void;

  clearAll: () => void;
}

const useSseEventBusStore = create<SseEventBusState>()(
  immer((set, get) => ({
    listeners: new Map(),

    emit(eventType, payload) {
      const handlers = get().listeners.get(eventType);
      if (handlers) {
        handlers.forEach((handler) => handler(payload));
      }
    },

    on(eventType, callback) {
      set((state) => {
        if (!state.listeners.has(eventType)) {
          state.listeners.set(eventType, new Set());
        }
        state.listeners.get(eventType)!.add(callback);
      });
    },

    off(eventType, callback) {
      set((state) => {
        const handlers = state.listeners.get(eventType);
        if (handlers) {
          handlers.delete(callback);
          if (handlers.size === 0) {
            state.listeners.delete(eventType);
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
