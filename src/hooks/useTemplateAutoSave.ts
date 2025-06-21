import { useRef } from 'react';
import useSseListener from '@/hooks/sse/useSseListener';
import { useSaveTemplateMutation } from '@/hooks/queries/template/useTemplateQueries';
import { TemplateSaveRequest } from '@/types/template';

export function useTemplateAutoSave() {
  const summaryRef = useRef<TemplateSaveRequest | null>(null);

  const { mutate: save, isPending } = useSaveTemplateMutation({
    onSuccess: () => {
      summaryRef.current = null;
    },
    onError: () => {
      summaryRef.current = null;
    },
  });

  useSseListener('summary', (data) => {
    const parsed = JSON.parse(data);
    summaryRef.current = parsed;
  });

  useSseListener('done', () => {
    if (!summaryRef.current || isPending) return;
    save(summaryRef.current);
  });
}
