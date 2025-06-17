import { useEffect } from 'react';

export const useChatSse = () => {
  useEffect(() => {
    const eventSource = new EventSource('/api/smishing/connect', {
      withCredentials: true, // 쿠키 인증 기반이면 true, JWT는 필요 없음
    });

    eventSource.onmessage = (event) => {
      console.log('채팅 메시지 수신:', event.data);
      // TODO: 수신한 메시지를 전역 상태로 저장하거나 처리
    };

    eventSource.onerror = (err) => {
      console.error('SSE 오류:', err);
      eventSource.close(); // 연결 종료
    };

    return () => {
      eventSource.close();
    };
  }, []);
};
