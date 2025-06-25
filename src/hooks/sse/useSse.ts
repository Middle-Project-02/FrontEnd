import { useEffect } from 'react';
import useSseEventBusStore from '@/stores/useSseEventBusStore';

export function useSse(path: string) {
  const emit = useSseEventBusStore((state) => state.emit);

  useEffect(() => {
    const fullPath = `${import.meta.env.VITE_API_URL}/${path}`;
    console.log(fullPath);
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
