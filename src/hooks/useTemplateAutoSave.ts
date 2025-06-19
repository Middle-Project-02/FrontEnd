import { useRef } from 'react';
import useSseListener from './sse/useSseListener';
import { saveTemplate } from '@/apis/template';

export function useTemplateAutoSave() {
  const summaryRef = useRef('');

  useSseListener('summary', (data) => {
    summaryRef.current = data;
  });

  useSseListener('done', async () => {
    if (!summaryRef.current) return;
    try {
      await saveTemplate(summaryRef.current);
      console.log('템플릿 저장 완료');
    } catch (err) {
      console.error('템플릿 저장 실패', err);
    } finally {
      summaryRef.current = '';
    }
  });
}
