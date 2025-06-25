import React from 'react';
import ChatBubble from '@/components/chat/ChatBubble';
import PlanCard from '@/components/chat/PlanCard';
import PlanSummaryCard from '@/components/chat/PlanSummaryCard';
import TTSButton from '@/components/chat/TTSButton';
import { Button } from '@/components/ui/button';
import { useGlobalTTS } from '@/utils/tts';
import type { SmartChoicePlanDto } from '@/types/smartChoicePlan';

interface ChatMessageListProps {
  messages: {
    sender: 'user' | 'ai';
    text: string;
    cards?: SmartChoicePlanDto[];
  }[];
  summaryMessages: { title: string; content: string }[];
  isCreatingPlanGuide: boolean;
  isAiResponding: boolean;
  onCreatePlanGuide: (planName?: string) => void;
}

const ChatMessageList = ({
  messages,
  summaryMessages,
  isCreatingPlanGuide,
  isAiResponding,
  onCreatePlanGuide,
}: ChatMessageListProps) => {
  const { speakMessage, stopAllSpeaking, isSpeaking } = useGlobalTTS();

  return (
    <>
      {messages.map((msg, i) => {
        const messageId = `message-${i}`;
        const isCurrentSpeaking = isSpeaking(messageId);

        return (
          <React.Fragment key={i}>
            {(msg.text || msg.cards) &&
              (msg.sender === 'ai' ? (
                <div className="flex flex-col items-start">
                  <div className="relative">
                    <ChatBubble role="ai">
                      {msg.text}
                      {msg.cards && (
                        <div className="flex flex-col">
                          {msg.cards.map((plan, idx) => (
                            <div key={idx}>
                              <PlanCard plan={plan} />
                              <div className="mt-12 flex flex-col gap-2">
                                <Button
                                  onClick={() => onCreatePlanGuide(plan.planName)}
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
                  </div>
                  
                  {msg.text && (
                    <TTSButton
                      messageId={messageId}
                      text={msg.text}
                      isSpeaking={isCurrentSpeaking}
                      onSpeak={(text) => speakMessage(messageId, text)}
                      onStop={stopAllSpeaking}
                    />
                  )}
                </div>
              ) : (
                <ChatBubble role="user">{msg.text}</ChatBubble>
              ))}
          </React.Fragment>
        );
      })}
      {summaryMessages.map((summary, i) => {
        const summaryId = `summary-${i}`;
        const isCurrentSpeaking = isSpeaking(summaryId);
        const summaryText = `${summary.title}. ${summary.content}`;

        return (
          <div key={`summary-${i}`} className="flex flex-col items-start">
            <div className="relative">
              <ChatBubble role="ai">
                <PlanSummaryCard title={summary.title} content={summary.content} />
              </ChatBubble>
            </div>
            <TTSButton
              messageId={summaryId}
              text={summaryText}
              isSpeaking={isCurrentSpeaking}
              onSpeak={(text) => speakMessage(summaryId, text)}
              onStop={stopAllSpeaking}
            />
          </div>
        );
      })}
    </>
  );
};

export default ChatMessageList;