import { SmartChoicePlanDto } from '@/types/smartChoicePlan';

export interface SummaryCreateEvent {
  title: string;
  content: string;
}

export const SseEvent = {
  CONNECTED: 'connected',
  QUESTION: 'question',
  ANSWER: 'answer',
  SUMMARY: 'summary',
  STREAM_CHAT: 'stream_chat',
  RECOMMEND_RESULT: 'recommend_result',
  DONE: 'done',
} as const;

export interface SseEventPayloadMap {
  [SseEvent.CONNECTED]: string;
  [SseEvent.QUESTION]: string;
  [SseEvent.ANSWER]: string;
  [SseEvent.SUMMARY]: SummaryCreateEvent;
  [SseEvent.STREAM_CHAT]: string;
  [SseEvent.RECOMMEND_RESULT]: SmartChoicePlanDto[];
  [SseEvent.DONE]: string;
}

export type SseEventType = keyof SseEventPayloadMap;
