//usechatmessage 훅 적용전
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendChatMessage } from '@/apis/chatbot';
import { useSse } from '@/hooks/sse/useSse';
import { useSseListener } from '@/hooks/sse/useSseListener';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/common/BackButton';
import { END_POINTS } from '@/constants/api';
import ChatBubble from '@/components/chat/ChatBubble';
import type { SmartChoicePlanDto } from '@/types/smartChoicePlan';
import ConnectBadge from '@/components/chat/ConnectBadge';
import { useSpeechRecognition } from '@/hooks/chat/useSpeechRecognition';
import { speak } from '@/utils/tts';
import { Textarea } from '@/components/chat/Textarea';
import useCreatePlanGuideMutation from '@/hooks/queries/template/useCreatePlanGuideMutation';
import PlanCard from '@/components/chat/PlanCard';
import PlanSummaryCard from '@/components/chat/PlanSummaryCard';
import { LandingDog } from '@/assets/svg';
import { useSendChatMessageMutation } from '@/hooks/queries/chat/useSendChatMessageMutation';
import ChatMessageList from '@/components/chat/ChatMessageList';
import InputForm from '@/components/chat/InputForm';
import VoiceMicButton from '@/components/chat/VoiceMicButton';
import MicGuideOverlay from '@/components/chat/overlay/MicGuideOverlay';
import ListeningOverlay from '@/components/chat/overlay/ListeningOverlay';
import ChatHeader from '@/components/chat/ChatHeader';

type AIResponseState = 'idle' | 'waiting' | 'streaming' | 'done';

const PlanChatBotPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; text: string; cards?: SmartChoicePlanDto[] }[]
  >([]);
  const [aiResponseState, setAiResponseState] = useState<AIResponseState>('idle');
  const [streamingMessage, setStreamingMessage] = useState<string | null>(null);
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
  const [summaryMessages, setSummaryMessages] = useState<{ title: string; content: string }[]>([]);
  const [showMicGuide, setShowMicGuide] = useState(true); //추가

  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);

  const { mutateCreatePlanGuide, isCreatingPlanGuide } = useCreatePlanGuideMutation();
  const { mutate: sendChat, isPending } = useSendChatMessageMutation();

  useSse(END_POINTS.CHAT.CONNECT);

  const {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  //
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMicGuide(false);
    }, 3000); // 3초 후 사라짐
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessage, aiResponseState]);

  useEffect(() => {
    setInput(transcript + interimTranscript);
  }, [transcript, interimTranscript]);

  useEffect(() => {
    if (!isListening && transcript) {
      setMessages((prev) => [...prev, { sender: 'user', text: transcript }]);
      setLastUserMessage(transcript);
      setAiResponseState('waiting');
      sendChat(transcript, {
        onSuccess: () => {
          resetTranscript();
          setInput('');
        },
        onError: () => {
          alert('메시지 전송 실패');
          setAiResponseState('idle');
        },
      });
    }
  }, [isListening, transcript]);

  const messagesRef = useRef<typeof messages>([]);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const onStreamChat = useCallback((data: string) => {
    const words = data.split(/(\s+)/);
    let index = 0;

    // AI 메시지 없으면 추가하고 waiting 상태 해제
    setMessages((prev) => {
      const last = prev.at(-1);
      if (!last || last.sender !== 'ai') {
        const newMsgs: { sender: 'user' | 'ai'; text: string; cards?: SmartChoicePlanDto[] }[] = [
          ...prev,
          { sender: 'ai', text: '' },
        ];
        messagesRef.current = newMsgs;
        // AI 챗버블이 생성되면 waiting 상태 종료
        setAiResponseState('streaming');
        return newMsgs;
      }
      return prev;
    });

    let currentText = '';
    const lastMessage = messagesRef.current.at(-1);
    if (lastMessage?.sender === 'ai' && lastMessage.text) {
      currentText = lastMessage.text;
    }

    const intervalId = setInterval(() => {
      if (index >= words.length) {
        clearInterval(intervalId);
        return;
      }

      currentText += words[index];

      const updated = [...messagesRef.current];
      const lastIdx = updated.length - 1;
      if (updated[lastIdx]?.sender === 'ai') {
        updated[lastIdx] = {
          ...updated[lastIdx],
          text: currentText,
        };
      }

      messagesRef.current = updated;
      setMessages(updated);
      setStreamingMessage(currentText);

      index++;
    }, 20);
  }, []);

  const onDone = useCallback(() => {
    setAiResponseState('done');
    setStreamingMessage(null);
    setTimeout(() => setAiResponseState('idle'), 100);
  }, []);

  const onOtherMessages = useCallback(
    (data: string, type: string) => {
      setStreamingMessage(null);

      if (type === 'question' && lastUserMessage === data) return;

      if (type === 'question') {
        const lastMsg = messagesRef.current.at(-1);
        if (lastMsg?.sender === 'user' && lastMsg.text === data) {
          return;
        }
      }

      const sender = type === 'question' ? 'user' : 'ai';

      if (sender === 'ai') {
        setAiResponseState('done');
      }

      setMessages((prev) => [...prev, { sender, text: data }]);
      if (type === 'question') setLastUserMessage(data);

      if (sender === 'ai') {
        setTimeout(() => setAiResponseState('idle'), 100);
      }
    },
    [lastUserMessage],
  );

  useSseListener('stream_chat', onStreamChat);
  useSseListener('done', onDone);
  useSseListener('question', (data) => onOtherMessages(data, 'question'));
  useSseListener('answer', (data) => onOtherMessages(data, 'answer'));
  useSseListener('summary', (data) => {
    try {
      const parsed = typeof data === 'string' ? JSON.parse(data) : data;
      setSummaryMessages((prev) => [...prev, { title: parsed.title, content: parsed.content }]);
      setAiResponseState('done');
      setTimeout(() => setAiResponseState('idle'), 100);
    } catch (err) {
      console.error('summary 이벤트 파싱 실패', err);
    }
  });

  useSseListener('recommend_result', (data) => {
    try {
      const parsed: SmartChoicePlanDto[] = typeof data === 'string' ? JSON.parse(data) : data;
      setAiResponseState('done');
      setMessages((prev) => [...prev, { sender: 'ai', text: '', cards: parsed }]);
      setTimeout(() => setAiResponseState('idle'), 100);
    } catch (err) {
      console.error('recommend_result 파싱 오류', err);
      setAiResponseState('idle');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    setLastUserMessage(input);
    setAiResponseState('waiting');
    sendChat(input, {
      onSuccess: () => setInput(''),
      onError: () => {
        alert('메시지 전송 실패');
        setAiResponseState('idle');
      },
    });
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
    if (showMicGuide) {
      setShowMicGuide(false);
    }
  };
  const handleCloseGuide = () => {
    setShowMicGuide(false);
  };

  const handleCreatePlanGuide = (planName?: string) => {
    // 채팅 메시지에 표시
    if (planName) {
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: `"${planName}" 요금제 변경 안내서를 만들어주세요.` },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: '요금제 변경 가이드 템플릿을 생성해주세요.' },
      ]);
    }

    setAiResponseState('waiting');
    mutateCreatePlanGuide();
  };

  const isAiResponding = aiResponseState !== 'idle';
  return (
    <div className="relative flex flex-col justify-between h-full mx-auto rounded bg-white px-6 pt-6 pb-4">
      {isListening && <ListeningOverlay />}
      {showMicGuide && !isListening && <MicGuideOverlay onClose={handleCloseGuide} />}
      <ChatHeader />
      <div className="flex-1 overflow-y-auto flex flex-col gap-12 text-body-lg w-[300px] mt-12 mb-12">
        <ChatMessageList
          messages={messages}
          summaryMessages={summaryMessages}
          isCreatingPlanGuide={isCreatingPlanGuide}
          isAiResponding={isAiResponding}
          onCreatePlanGuide={handleCreatePlanGuide}
        />
        {aiResponseState === 'waiting' && <WaitingIndicator />}
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
          input={input}
          onChangeInput={setInput}
          onSubmit={handleSubmit}
          isAiResponding={isAiResponding}
        />
      </div>
    </div>
  );
};

export default PlanChatBotPage;

const WaitingIndicator = () => {
  return (
    <div className="flex items-center justify-start">
      <div className="bg-gray-100 rounded-2xl px-4 py-3 max-w-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse [animation-delay:0s]" />
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse [animation-delay:0.4s]" />
          </div>
          <span className="text-xs text-gray-600 font-medium animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

const CenterVoiceWave = () => (
  <div className="flex items-center justify-center gap-2">
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
      <div
        key={i}
        className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-full animate-[wave_1s_ease-in-out_infinite]"
        style={{
          width: '4px',
          animationDelay: `${i * 0.1}s`,
          height: `${20 + Math.sin(i * 0.5) * 15}px`,
          minHeight: '8px',
        }}
      />
    ))}
  </div>
);
