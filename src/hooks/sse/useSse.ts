
import useSseEventBusStore from "@/stores/useSseEventBusStore";
import { BASE_URL } from '@/constants/api';
import { PATH } from '@/constants/path';
import { useEffect } from "react";

export function useSse() {
  const emit = useSseEventBusStore((state) => state.emit);

  useEffect(() => {
    const eventSource = new EventSource(`${BASE_URL}${PATH.SSE.CONNECT}`, {
      withCredentials: true,
    });

    const sseEvents = ["question", "answer", "summary", "stream_chat", "done"];

    sseEvents.forEach((event) => {
      eventSource.addEventListener(event, (e) => {
        emit(event, e.data);
      });
    });

    eventSource.onerror = (err) => {
      console.error("SSE error", err);
    };

    return () => {
      eventSource.close();
    };
  }, [emit]);
}

export default useSse;
