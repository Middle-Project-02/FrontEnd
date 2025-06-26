import { useEffect } from 'react';
import useSseEventBusStore from '@/stores/useSseEventBusStore';
import { SseEventType, SseEventPayloadMap } from '@/types/sseEventType';

export function useSseListener<T extends SseEventType>(
  eventType: T,
  callback: (payload: SseEventPayloadMap[T]) => void,
) {
  const on = useSseEventBusStore((state) => state.on);
  const off = useSseEventBusStore((state) => state.off);

  useEffect(() => {
    on(eventType, callback);

    return () => {
      off(eventType, callback);
    };
  }, [eventType, callback, on, off]);
}

export default useSseListener;
