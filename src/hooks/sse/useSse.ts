import { useEffect } from 'react';
import useSseEventBusStore from '@/stores/useSseEventBusStore';
import { BASE_URL } from '@/constants/api';
import { SseEvent, SseEventType, SseEventPayloadMap } from '@/types/sseEventType';

export function useSse(path: string) {
  const emit = useSseEventBusStore((state) => state.emit);

  useEffect(() => {
    const fullPath = `${BASE_URL}/${path}`;

    const eventSource = new EventSource(fullPath, {
      withCredentials: true,
    });

    const handleAddEventListener = <T extends SseEventType>(eventType: T) => {
      eventSource.addEventListener(eventType, (e) => {
        try {
          let payload: SseEventPayloadMap[T];
          if (eventType === SseEvent.SUMMARY || eventType === SseEvent.RECOMMEND_RESULT) {
            payload = JSON.parse(e.data);
          } else {
            payload = e.data as SseEventPayloadMap[T];
          }
          emit(eventType, payload);
        } catch (error) {
          console.error(`Failed to parse ${eventType} event data:`, error);
          emit(eventType, e.data as SseEventPayloadMap[T]);
        }
      });
    };

    Object.values(SseEvent).forEach((eventType) => {
      handleAddEventListener(eventType as SseEventType);
    });

    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
    };

    return () => {
      eventSource.close();
    };
  }, [emit, path]);
}

export default useSse;
