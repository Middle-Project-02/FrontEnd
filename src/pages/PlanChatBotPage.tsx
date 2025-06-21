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
  const [showMicGuide, setShowMicGuide] = useState(true);//추가

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
    // 추가: 가이드를 사용했으면 즉시 닫기
    if (showMicGuide) {
      setShowMicGuide(false);
    }
  };
   // 추가: 가이드 수동 닫기 함수
  const handleCloseGuide = () => {
    setShowMicGuide(false);
  };

  // const handleCreatePlanGuide = () => {
  //   setMessages((prev) => [
  //     ...prev,
  //     { sender: 'user', text: '요금제 변경 가이드 템플릿을 생성해주세요.' },
  //   ]);
  //   setAiResponseState('waiting');
  //   mutateCreatePlanGuide();
  // };
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
      {/* 추가: PWA 스타일 가이드 오버레이 */}
      {showMicGuide && !isListening && (
        <div className="fixed inset-0 z-40">
          {/* 수정: 더 진한 배경 블러 (bg-black/20 → bg-black/40) */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 animate-fadeInBg" />
          
          {/* 수정: 모든 요소를 하나의 중앙 플렉스 컨테이너로 통합 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative flex flex-col items-center">
              
              {/* 말풍선 - 최상위 z-index */}
              <div className="relative z-30 mb-6 opacity-0 animate-slideUpGuide">
                <div className="bg-white text-gray-800 text-sm rounded-2xl px-5 py-3 shadow-xl border border-gray-100 min-w-max">
                  <div className="font-medium text-center">🎤 음성으로 질문해보세요!</div>
                  <div className="text-xs text-gray-500 text-center mt-1">아래 마이크 버튼을 눌러 시작하세요</div>
                  
                  {/* 말풍선 화살표 (아래쪽) */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45"></div>
                  </div>
                </div>
              </div>
              
              {/* 강아지 이미지 - 중간 z-index */}
              <div className="relative z-20 w-[220px] h-[180px] mb-20 opacity-0 animate-slideUpGuide">
                <img src={LandingDog} alt="LandingDog" className="w-full h-full object-contain" />
              </div>
              
            </div>
          </div>
        </div>
      )}

      {/* 음성 인식 오버레이 */}
      {isListening && (
        <div className="absolute inset-0 bg-black/50 z-50 flex flex-col items-center justify-center">
          <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center">
            <div className="relative flex justify-center">
              <button
                onClick={handleVoiceToggle}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform animate-pulse"
              >
                <span className="text-4xl text-white">🎤</span>
              </button>
            </div>

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
        <BackButton />
        <div className="flex items-center gap-3">
          {/* <Button
            onClick={handleCreatePlanGuide}
            disabled={isCreatingPlanGuide || isAiResponding}
            variant="outline"
            outlineColor="primary"
            size="sm"
          >
            {isCreatingPlanGuide ? '생성중...' : '가이드 템플릿'}
          </Button> */}
          <ConnectBadge connected />
        </div>
      </div>

      <h2 className="text-heading-h3 font-semibold text-black">
        아지가 요금제를 추천해드릴게요!
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
                        {/* {msg.cards.map((plan, idx) => (
                          <PlanCard key={idx} plan={plan} />
                        ))} */}
                        {msg.cards.map((plan, idx) => (
  <div key={idx}>
    <PlanCard plan={plan} />
    <div className="mt-2 flex flex-col gap-2">
      <Button
        onClick={() => handleCreatePlanGuide(plan.planName)}
        disabled={isCreatingPlanGuide || isAiResponding}
        className="w-full"
      >
        {isCreatingPlanGuide ? '생성중...' : '요금제 변경 안내서 만들기'}
      </Button>
    </div>
  </div>
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
        {/* {summaryMessages.map((summary, i) => (
          <div
            key={`summary-${i}`}
            className="flex flex-col items-start gap-2 bg-gray-50 rounded-xl p-4"
          >
            <div className="text-lg font-bold text-primary">제목: {summary.title}</div>
            <div className="text-base text-gray-800 whitespace-pre-wrap">
              내용: {summary.content}
            </div>
          </div>
        ))} */}
        {summaryMessages.map((summary, i) => (
  <PlanSummaryCard key={`summary-${i}`} title={summary.title} content={summary.content} />
))}


        <div ref={bottomRef} />
      </div>

      {/* 인풋 영역과 마이크 버튼 */}
      <div className="flex flex-col gap-3">
        {/* 마이크 버튼 - 인풋 위 중앙에 배치 */}
        <div className="relative flex justify-center">
          {/* 가이드용 하이라이트 링들 - 마이크와 같은 중앙 정렬 */}
          {showMicGuide && !isListening && (
            <>
              {/* 부드럽게 깜빡이는 하이라이트 링 - 마이크 버튼과 정확히 일치 */}
              <div className="absolute flex justify-center items-center w-20 h-20 rounded-full bg-red-400/20 animate-gentlePulse z-10" />
              <div className="absolute flex justify-center items-center w-24 h-24 rounded-full bg-blue-300/15 animate-gentlePulse2 z-10" />
            </>
          )}
          
          <button
            onClick={handleVoiceToggle}
            disabled={isAiResponding}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl text-3xl transition-all duration-300 relative z-50 ${
              isListening
                ? 'bg-gradient-to-br from-red-500 to-red-600 text-white animate-pulse'
                : isAiResponding
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white hover:scale-105 hover:shadow-2xl'
            }`}
          >
            <svg 
              width="54" 
              height="54" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className="drop-shadow-sm"
            >
              <path d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2S9 3.34 9 5V11C9 12.66 10.34 14 12 14Z"/>
              <path d="M17 11C17 14.76 14.76 17 11 17H13C16.31 17 19 14.31 19 11H17Z"/>
              <path d="M5 11C5 14.31 7.69 17 11 17H13C9.69 17 7 14.31 7 11H5Z"/>
              <path d="M11 19V22H13V19C13 19 12 19 11 19Z"/>
              <path d="M9 22H15V20H9V22Z"/>
            </svg>
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

      {/* 수정: 커스텀 애니메이션 스타일 (기존 애니메이션 대체) */}
      <style jsx>{`
        /* 추가: 배경 블러 페이드인 애니메이션 */
        @keyframes fadeInBg {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        
        /* 수정: 말풍선 슬라이드업 애니메이션 개선 */
        @keyframes slideUpGuide {
          0% {
            opacity: 0;
            transform: translateY(15px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        /* 추가: 지연된 핑 애니메이션 */
        @keyframes delayedPing {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        
        /* 추가: 지연된 펄스 애니메이션 */
        @keyframes delayedPulse {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.7;
          }
        }
        
        /* 추가: 부드러운 펄스 애니메이션 - 마이크 하이라이트용 */
        @keyframes gentlePulse {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
        }
        
        @keyframes gentlePulse2 {
          0% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.03);
          }
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
        }
        
        /* 추가: 애니메이션 클래스들 */
        .animate-fadeInBg {
          animation: fadeInBg 1s ease-out forwards;
        }
        
        .animate-slideUpGuide {
          animation: slideUpGuide 0.8s ease-out 0.5s forwards;
        }
        
        .animate-delayedPing {
          animation: delayedPing 2s ease-out 0.8s infinite;
        }
        
        .animate-delayedPulse {
          animation: delayedPulse 2s ease-out 1s infinite;
        }
      
/* ✅ 테스트용으로 매우 느리게 */
.animate-gentlePulse {
  animation: gentlePulse 8s ease-in-out 0s infinite;
}

.animate-gentlePulse2 {
  animation: gentlePulse2 10s ease-in-out 0s infinite;
}
      `}</style>
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
