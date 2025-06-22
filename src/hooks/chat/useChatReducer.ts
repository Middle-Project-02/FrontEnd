import { SmartChoicePlanDto } from '@/types/smartChoicePlan';

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  cards?: SmartChoicePlanDto[];
}
export interface SummaryMessage {
  title: string;
  content: string;
}

export interface ChatState {
  input: string;
  messages: ChatMessage[];
  summaryMessages: SummaryMessage[];
  streamingMessage: string | null;
  aiResponseState: 'idle' | 'waiting' | 'streaming' | 'done';
  lastUserMessage: string | null;
  showMicGuide: boolean;
}

export const initialChatState: ChatState = {
  input: '',
  messages: [],
  summaryMessages: [],
  streamingMessage: null,
  aiResponseState: 'idle',
  lastUserMessage: null,
  showMicGuide: true,
};

export enum ChatActionType {
  SET_INPUT,
  ADD_MESSAGE,
  UPDATE_STREAMING_MESSAGE,
  SET_AI_STATE,
  SET_LAST_USER,
  ADD_SUMMARY,
  ADD_RECOMMEND_CARDS,
  SET_SHOW_MIC_GUIDE,
  RESET_STREAMING,
}

export type ChatAction =
  | { type: ChatActionType.SET_INPUT; payload: string }
  | { type: ChatActionType.ADD_MESSAGE; payload: ChatMessage }
  | { type: ChatActionType.UPDATE_STREAMING_MESSAGE; payload: string }
  | { type: ChatActionType.SET_AI_STATE; payload: ChatState['aiResponseState'] }
  | { type: ChatActionType.SET_LAST_USER; payload: string }
  | { type: ChatActionType.ADD_SUMMARY; payload: SummaryMessage }
  | { type: ChatActionType.ADD_RECOMMEND_CARDS; payload: SmartChoicePlanDto[] }
  | { type: ChatActionType.SET_SHOW_MIC_GUIDE; payload: boolean }
  | { type: ChatActionType.RESET_STREAMING };

export function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case ChatActionType.SET_INPUT:
      return { ...state, input: action.payload };
    case ChatActionType.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case ChatActionType.UPDATE_STREAMING_MESSAGE:
      return {
        ...state,
        streamingMessage: action.payload,
        messages: state.messages.map((m, i, arr) =>
          i === arr.length - 1 && m.sender === 'ai' ? { ...m, text: action.payload } : m,
        ),
      };
    case ChatActionType.SET_AI_STATE:
      return { ...state, aiResponseState: action.payload };
    case ChatActionType.SET_LAST_USER:
      return { ...state, lastUserMessage: action.payload };
    case ChatActionType.ADD_SUMMARY:
      return { ...state, summaryMessages: [...state.summaryMessages, action.payload] };
    case ChatActionType.ADD_RECOMMEND_CARDS:
      return {
        ...state,
        messages: [...state.messages, { sender: 'ai', text: '', cards: action.payload }],
      };
    case ChatActionType.SET_SHOW_MIC_GUIDE:
      return { ...state, showMicGuide: action.payload };
    case ChatActionType.RESET_STREAMING:
      return { ...state, streamingMessage: null };
    default:
      return state;
  }
}
