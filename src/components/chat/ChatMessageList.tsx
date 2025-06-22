import React from 'react';
import ChatBubble from '@/components/chat/ChatBubble';
import PlanCard from '@/components/chat/PlanCard';
import PlanSummaryCard from '@/components/chat/PlanSummaryCard';
import { Button } from '@/components/ui/button';
import { speak } from '@/utils/tts';
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
  return (
    <>
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

      {summaryMessages.map((summary, i) => (
        <div key={`summary-${i}`} className="flex flex-col items-start">
          <ChatBubble role="ai">
            <PlanSummaryCard title={summary.title} content={summary.content} />
          </ChatBubble>
        </div>
      ))}
    </>
  );
};

export default ChatMessageList;
