import useSseEventBusStore from '@/stores/useSseEventBusStore';
import { useEffect } from 'react';

export function useSseListener(event: string, callback: (data: string) => void) {
  const on = useSseEventBusStore((state) => state.on);
  const off = useSseEventBusStore((state) => state.off);

  useEffect(() => {
    on(event, callback);
    return () => {
      off(event, callback);
    };
  }, [event, callback, on, off]);
}

export default useSseListener;
