import { useCallback, useRef } from 'react';
import useSseListener from '@/hooks/sse/useSseListener';
import { useSaveTemplateMutation } from '@/hooks/queries/template/useTemplateQueries';
import { TemplateSaveRequest } from '@/types/template';
import { SseEvent, SummaryCreateEvent } from '@/types/sseEventType';

export function useTemplateAutoSave() {
  const summaryRef = useRef<TemplateSaveRequest | null>(null);

  const resetSummary = () => {
    summaryRef.current = null;
  };

  const { mutate: save, isPending } = useSaveTemplateMutation({
    onSuccess: resetSummary,
    onError: resetSummary,
  });

  const handleSummary = useCallback((summary: SummaryCreateEvent) => {
    summaryRef.current = summary as TemplateSaveRequest;
  }, []);

  const handleDone = useCallback(() => {
    if (!summaryRef.current || isPending) return;
    save(summaryRef.current);
  }, [save, isPending]);

  useSseListener(SseEvent.SUMMARY, handleSummary);
  useSseListener(SseEvent.DONE, handleDone);
}
