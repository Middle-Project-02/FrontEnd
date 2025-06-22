import React, { useEffect, useRef, useReducer, useCallback } from 'react';
import { useSse } from '@/hooks/sse/useSse';
import { useSseListener } from '@/hooks/sse/useSseListener';
import { useSpeechRecognition } from '@/hooks/chat/useSpeechRecognition';
import { END_POINTS } from '@/constants/api';
import { SmartChoicePlanDto } from '@/types/smartChoicePlan';
import useCreatePlanGuideMutation from '@/hooks/queries/template/useCreatePlanGuideMutation';
import { useSendChatMessageMutation } from '@/hooks/queries/chat/useSendChatMessageMutation';
import ChatHeader from '@/components/chat/ChatHeader';
import ChatMessageList from '@/components/chat/ChatMessageList';
import VoiceMicButton from '@/components/chat/VoiceMicButton';
import InputForm from '@/components/chat/InputForm';
import ListeningOverlay from '@/components/chat/overlay/ListeningOverlay';
import MicGuideOverlay from '@/components/chat/overlay/MicGuideOverlay';
import { chatReducer, initialChatState, ChatActionType } from '@/hooks/chat/useChatReducer';
import { toast } from 'sonner';

const PlanChatBotPage = () => {
  const [state, dispatch] = useReducer(chatReducer, initialChatState);
  const { mutateCreatePlanGuide, isCreatingPlanGuide } = useCreatePlanGuideMutation();
  const { mutate: sendChat } = useSendChatMessageMutation();
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  useSse(END_POINTS.CHAT.CONNECT);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages, state.streamingMessage, state.aiResponseState]);

  useEffect(() => {
    dispatch({ type: ChatActionType.SET_INPUT, payload: transcript + interimTranscript });
  }, [transcript, interimTranscript]);

  useEffect(() => {
    if (!isListening && transcript) {
      dispatch({ type: ChatActionType.ADD_MESSAGE, payload: { sender: 'user', text: transcript } });
      dispatch({ type: ChatActionType.SET_LAST_USER, payload: transcript });
      dispatch({ type: ChatActionType.SET_AI_STATE, payload: 'waiting' });
      sendChat(transcript, {
        onSuccess: () => {
          resetTranscript();
          dispatch({ type: ChatActionType.SET_INPUT, payload: '' });
        },
        onError: () => {
          toast.error('음성 메시지 전송에 실패했어요. 다시 시도해주세요.');
          dispatch({ type: ChatActionType.SET_AI_STATE, payload: 'idle' });
        },
      });
    }
  }, [isListening, transcript]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: ChatActionType.SET_SHOW_MIC_GUIDE, payload: false });
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const onStreamChat = useCallback(
    (data: string) => {
      const words = data.split(/(\s+)/);
      let index = 0;

      const last = state.messages.at(-1);
      if (!last || last.sender !== 'ai') {
        dispatch({ type: ChatActionType.ADD_MESSAGE, payload: { sender: 'ai', text: '' } });
        dispatch({ type: ChatActionType.SET_AI_STATE, payload: 'streaming' });
      }

      let currentText = state.streamingMessage || '';
      const intervalId = setInterval(() => {
        if (index >= words.length) {
          clearInterval(intervalId);
          return;
        }
        currentText += words[index];
        dispatch({ type: ChatActionType.UPDATE_STREAMING_MESSAGE, payload: currentText });
        index++;
      }, 20);
    },
    [state.messages, state.streamingMessage],
  );

  const onDone = () => {
    dispatch({ type: ChatActionType.SET_AI_STATE, payload: 'done' });
    dispatch({ type: ChatActionType.RESET_STREAMING });
    setTimeout(() => {
      dispatch({ type: ChatActionType.SET_AI_STATE, payload: 'idle' });
    }, 100);
  };

  const onOtherMessages = (data: string, type: string) => {
    dispatch({ type: ChatActionType.RESET_STREAMING });
    const sender = type === 'question' ? 'user' : 'ai';
    if (type === 'question' && state.lastUserMessage === data) return;
    dispatch({ type: ChatActionType.ADD_MESSAGE, payload: { sender, text: data } });
    if (type === 'question') dispatch({ type: ChatActionType.SET_LAST_USER, payload: data });
    if (sender === 'ai') {
      dispatch({ type: ChatActionType.SET_AI_STATE, payload: 'done' });
      setTimeout(() => dispatch({ type: ChatActionType.SET_AI_STATE, payload: 'idle' }), 100);
    }
  };

  useSseListener('stream_chat', onStreamChat);
  useSseListener('done', onDone);
  useSseListener('question', (data) => onOtherMessages(data, 'question'));
  useSseListener('answer', (data) => onOtherMessages(data, 'answer'));
  useSseListener('summary', (data) => {
    try {
      const parsed = typeof data === 'string' ? JSON.parse(data) : data;
      dispatch({ type: ChatActionType.ADD_SUMMARY, payload: parsed });
      dispatch({ type: ChatActionType.SET_AI_STATE, payload: 'done' });
      setTimeout(() => dispatch({ type: ChatActionType.SET_AI_STATE, payload: 'idle' }), 100);
    } catch (e) {
      console.error('summary 파싱 오류', e);
    }
  });
  useSseListener('recommend_result', (data) => {
    try {
      const parsed: SmartChoicePlanDto[] = typeof data === 'string' ? JSON.parse(data) : data;
      dispatch({ type: ChatActionType.ADD_RECOMMEND_CARDS, payload: parsed });
      dispatch({ type: ChatActionType.SET_AI_STATE, payload: 'done' });
      setTimeout(() => dispatch({ type: ChatActionType.SET_AI_STATE, payload: 'idle' }), 100);
    } catch (e) {
      console.error('recommend_result 파싱 오류', e);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.input.trim()) return;
    dispatch({ type: ChatActionType.ADD_MESSAGE, payload: { sender: 'user', text: state.input } });
    dispatch({ type: ChatActionType.SET_LAST_USER, payload: state.input });
    dispatch({ type: ChatActionType.SET_AI_STATE, payload: 'waiting' });
    sendChat(state.input, {
      onSuccess: () => dispatch({ type: ChatActionType.SET_INPUT, payload: '' }),
      onError: () => {
        toast.error('메시지 전송에 실패했어요. 로그인 후 다시 시도해주세요.');
        dispatch({ type: ChatActionType.SET_AI_STATE, payload: 'idle' });
      },
    });
  };

  const handleVoiceToggle = () => {
    if (isListening) stopListening();
    else startListening();
    if (state.showMicGuide) dispatch({ type: ChatActionType.SET_SHOW_MIC_GUIDE, payload: false });
  };

  const handleCreatePlanGuide = (planName?: string) => {
    const text = planName
      ? `"${planName}" 요금제 변경 안내서를 만들어주세요.`
      : '요금제 변경 가이드 템플릿을 생성해주세요.';
    dispatch({ type: ChatActionType.ADD_MESSAGE, payload: { sender: 'user', text } });
    dispatch({ type: ChatActionType.SET_AI_STATE, payload: 'waiting' });
    mutateCreatePlanGuide();
  };

  const isAiResponding = state.aiResponseState !== 'idle';

  return (
    <div className="relative flex flex-col justify-between h-full mx-auto rounded bg-white px-6 pt-6 pb-4">
      {isListening && <ListeningOverlay />}
      {state.showMicGuide && !isListening && (
        <MicGuideOverlay
          onClose={() => dispatch({ type: ChatActionType.SET_SHOW_MIC_GUIDE, payload: false })}
        />
      )}
      <ChatHeader />
      <div className="flex-1 overflow-y-auto flex flex-col gap-12 text-body-lg w-[300px] mt-12 mb-12">
        <ChatMessageList
          messages={state.messages}
          summaryMessages={state.summaryMessages}
          isCreatingPlanGuide={isCreatingPlanGuide}
          isAiResponding={isAiResponding}
          onCreatePlanGuide={handleCreatePlanGuide}
        />
        {state.aiResponseState === 'waiting' && <WaitingIndicator />}
        <div ref={bottomRef} />
      </div>
      <div className="flex flex-col gap-3">
        <div className="relative flex justify-center">
          <VoiceMicButton
            isListening={isListening}
            isDisabled={isAiResponding}
            onClick={handleVoiceToggle}
          />
        </div>
        <InputForm
          input={state.input}
          onChangeInput={(v) => dispatch({ type: ChatActionType.SET_INPUT, payload: v })}
          onSubmit={handleSubmit}
          isAiResponding={isAiResponding}
        />
      </div>
    </div>
  );
};

export default PlanChatBotPage;

const WaitingIndicator = () => (
  <div className="flex items-center justify-start">
    <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse [animation-delay:0s]" />
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse [animation-delay:0.2s]" />
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  </div>
);
