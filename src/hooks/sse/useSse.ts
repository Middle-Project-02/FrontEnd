import { useEffect } from 'react';
import useSseEventBusStore from '@/stores/useSseEventBusStore';

export function useSse(path: string) {
  console.log(`${import.meta.env.VITE_BASE_URL}/${path}`);
  const emit = useSseEventBusStore((state) => state.emit);

  useEffect(() => {
    const fullPath = `${import.meta.env.VITE_BASE_URL}/${path}`;
    
    const eventSource = new EventSource(fullPath, {
      withCredentials: true,
    });

    const sseEvents = ["question", "answer", "summary", "stream_chat", "recommend_result", "done"];

    sseEvents.forEach((event) => {
      eventSource.addEventListener(event, (e) => {
        emit(event, e.data);
      });
    });

    eventSource.onerror = (err) => {
      console.error('SSE error', err);
    };

    return () => {
      eventSource.close();
    };
  }, [emit, path]);
}

export default useSse;
