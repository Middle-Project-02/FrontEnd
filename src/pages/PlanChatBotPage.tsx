import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendChatMessage } from '@/apis/chatbot';
import { useSse } from '@/hooks/sse/useSse';
import { useSseListener } from '@/hooks/sse/useSseListener';
import { Button } from '@/components/ui/button';
import { END_POINTS } from '@/constants/api';
import ChatBubble from '@/components/chat/ChatBubble';
import type { SmartChoicePlanDto } from '@/types/smartChoicePlan';
import ConnectBadge from '@/components/chat/ConnectBadge';
import { useSpeechRecognition } from '@/hooks/chat/useSpeechRecognition';
import { speak } from '@/utils/tts';
import { Textarea } from '@/components/chat/Textarea';
import useCreatePlanGuideMutation from '@/hooks/queries/template/useCreatePlanGuideMutation';
import PlanCard from '@/components/chat/PlanCard';

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

  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement>(null);

  const { mutateCreatePlanGuide, isCreatingPlanGuide } = useCreatePlanGuideMutation();

  useSse(END_POINTS.CHAT.CONNECT);

  const {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

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
      sendChatMessage(transcript)
        .then(() => {
          resetTranscript();
          setInput('');
        })
        .catch(() => {
          alert('메시지 전송 실패');
          setAiResponseState('idle');
        });
    }
  }, [isListening]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    setLastUserMessage(input);
    setAiResponseState('waiting');
    try {
      await sendChatMessage(input);
      setInput('');
    } catch {
      alert('메시지 전송 실패');
      setAiResponseState('idle');
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleCreatePlanGuide = () => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: '요금제 변경 가이드 템플릿을 생성해주세요.' },
    ]);
    setAiResponseState('waiting');
    mutateCreatePlanGuide();
  };

  const isAiResponding = aiResponseState !== 'idle';

  return (
    <div className="relative flex flex-col justify-between h-full mx-auto rounded bg-white px-6 pt-6 pb-4">
      {/* 음성 인식 오버레이 */}
      {isListening && (
        <div className="absolute inset-0 bg-black/50 z-50 flex flex-col items-center justify-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center">
            {/* 메인 마이크 버튼 */}
            <button
              onClick={handleVoiceToggle}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg mb-6 transform hover:scale-105 transition-transform"
            >
              <span className="text-4xl text-white">🎤</span>
            </button>

            {/* 중앙 음성 파형 */}
            <CenterVoiceWave />

            {/* 안내 텍스트 */}
            <div className="text-center mt-6">
              <div className="text-xl font-semibold text-gray-800 mb-2">음성 인식 중</div>
              <div className="text-sm text-gray-600">말씀해주세요</div>
              {transcript && (
                <div className="mt-4 p-3 bg-gray-100 rounded-lg max-w-sm">
                  <div className="text-sm text-gray-700">{transcript}</div>
                  {interimTranscript && (
                    <div className="text-sm text-gray-400 italic">{interimTranscript}</div>
                  )}
                </div>
              )}
            </div>

            {/* 종료 버튼 */}
            <button
              onClick={handleVoiceToggle}
              className="mt-6 px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
            >
              완료
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between px-2 py-3 text-base font-medium">
        <button className="text-black" onClick={() => navigate(-1)}>
          ← 뒤로가기
        </button>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleCreatePlanGuide}
            disabled={isCreatingPlanGuide || isAiResponding}
            variant="outline"
            outlineColor="primary"
            size="sm"
          >
            {isCreatingPlanGuide ? '생성중...' : '가이드 템플릿'}
          </Button>
          <ConnectBadge connected />
        </div>
      </div>

      <h2 className="text-heading-h3 font-semibold text-black">
        궁금한 요금제나 변경 문의를 입력해보세요!
      </h2>
      <div className="flex-1 overflow-y-auto flex flex-col gap-12 text-body-lg w-[300px] mt-12 mb-12">
        {messages.map((msg, i) => (
          <React.Fragment key={i}>
            {(msg.text || msg.cards) &&
              (msg.sender === 'ai' ? (
                <div className="flex flex-col items-start">
                  <ChatBubble role="ai">
                    {msg.text}
                    {msg.cards && (
                      <div className="flex flex-col">
                        {msg.cards.map((plan, idx) => (
                          <PlanCard key={idx} plan={plan} />
                        ))}
                      </div>
                    )}
                  </ChatBubble>
                  {msg.text && (
                    <Button
                      onClick={() => speak(msg.text)}
                      variant="ghost"
                      size="sm"
                      className="mt-1 ml-4 px-8 py-4 text-[1.2rem] h-auto"
                    >
                      🔊 읽기
                    </Button>
                  )}
                </div>
              ) : (
                <ChatBubble role="user">{msg.text}</ChatBubble>
              ))}
          </React.Fragment>
        ))}

        {aiResponseState === 'waiting' && <WaitingIndicator />}
        {summaryMessages.map((summary, i) => (
          <div
            key={`summary-${i}`}
            className="flex flex-col items-start gap-2 bg-gray-50 rounded-xl p-4"
          >
            <div className="text-lg font-bold text-primary">제목: {summary.title}</div>
            <div className="text-base text-gray-800 whitespace-pre-wrap">
              내용: {summary.content}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* 인풋 영역과 마이크 버튼 */}
      <div className="flex flex-col gap-3">
        {/* 마이크 버튼 - 인풋 위 중앙에 배치 */}
        <div className="flex justify-center">
          <button
            onClick={handleVoiceToggle}
            disabled={isAiResponding}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg text-2xl transition-all duration-300 ${
              isListening
                ? 'bg-gradient-to-br from-red-500 to-red-600 text-white animate-pulse'
                : isAiResponding
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:scale-105'
            }`}
          >
            🎤
          </button>
        </div>

        {/* 폼 영역 */}
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="질문을 입력하세요"
            inputSize="lg"
            variant="default"
            className="flex-1"
          />
          <Button type="submit" disabled={!input.trim() || isAiResponding} className="ml-2">
            {isAiResponding ? '응답중...' : '전송'}
          </Button>
        </form>
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
        <span className="text-xs text-gray-600 font-medium animate-pulse"></span>
      </div>
    </div>
  </div>
);

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
