import { useRef } from 'react';
import useSseListener from './sse/useSseListener';
import { useSaveTemplateMutation } from './queries/template/useTemplateQueries';

export function useTemplateAutoSave() {
  const summaryRef = useRef('');

  const { mutate: save, isPending } = useSaveTemplateMutation({
    onSuccess: () => {
      console.log('템플릿 저장 완료');
      summaryRef.current = '';
    },
    onError: () => {
      console.error('템플릿 저장 실패');
      summaryRef.current = '';
    },
  });

  // 템플릿 수신 시 저장
  useSseListener('summary', (data) => {
    summaryRef.current = data;
  });

  // 완료 이벤트 시 저장 트리거
  useSseListener('done', () => {
    if (!summaryRef.current || isPending) return;
    save(summaryRef.current);
  });
}
