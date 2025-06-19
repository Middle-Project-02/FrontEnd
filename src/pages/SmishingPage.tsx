import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSse } from '@/hooks/sse/useSse';
import { useSseListener } from '@/hooks/sse/useSseListener';
import { END_POINTS } from '@/constants/api';
import { Button } from '@/components/ui/button';
import { Textarea, TextareaHandle } from '@/components/ui/textarea';
import ConnectBadge from '@/components/ui/ConnectBadge';
import ChatBubble from '@/components/ui/chatBubble';
import { useSmishingMutation } from '@/hooks/queries/smishing/useSmishingChat';

const SmishingPage = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [aiResponse, setAiResponse] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const currentAiResponseRef = useRef('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<TextareaHandle>(null);

  useSse(END_POINTS.SMISHING.CONNECT);

  useSseListener('stream_chat', (chunk) => {
    currentAiResponseRef.current += chunk;
    setAiResponse((prev) => prev + chunk);
  });

  useSseListener('done', () => {
    const finalResponse = currentAiResponseRef.current;
    if (finalResponse.trim()) {
      setMessages((prev) => [...prev, { role: 'ai', content: finalResponse }]);
    }
    resetAiResponse();
    setIsLoading(false);
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, aiResponse]);

  const mutation = useSmishingMutation(
    () => {},
    () => {
      setError('메시지 전송에 실패했습니다.');
      setIsLoading(false);
    },
  );

  const resetAiResponse = () => {
    setAiResponse('');
    currentAiResponseRef.current = '';
  };

  const isInputValid = (input: string) => input.trim().length > 0;

  const appendUserMessage = (content: string) => {
    setMessages((prev) => [...prev, { role: 'user', content }]);
  };

  const resetInputState = () => {
    setInput('');
    textareaRef.current?.resetHeight();
  };

  const prepareForResponse = () => {
    resetAiResponse();
    setError('');
    setIsLoading(true);
  };

  const sendMessage = () => {
    if (!isInputValid(input)) return;

    const userMessage = input.trim();

    appendUserMessage(userMessage);
    resetInputState();
    prepareForResponse();

    mutation.mutate(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      setError('붙여넣기에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col justify-between h-full mx-auto rounded-8 bg-white px-30 pt-40 pb-24">
      <div className="flex items-center justify-between px-4 py-3 text-body-md font-medium">
        <button className="text-black" onClick={() => navigate(-1)}>
          ← 뒤로가기
        </button>
        <ConnectBadge connected={!error} />
      </div>

      <h2 className="text-heading-h3 font-semibold text-black">
        받으신 문자를 여기에 붙여넣어 주세요. 확인해드릴게요!
      </h2>
      <div className="flex items-center gap-8"></div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-12 text-body-lg w-[300px] mt-12 mb-12">
        <button
          className="px-16 py-12 rounded-24 whitespace-pre-wrap break-words leading-snug max-w-[268px] bg-bgSecondary text-black rounded-tl-4"
          onClick={handlePaste}
        >
          메시지 붙여넣기
        </button>
        {messages.map((msg, i) => (
          <ChatBubble key={i} role={msg.role}>
            {msg.content}
          </ChatBubble>
        ))}

        {aiResponse && (
          <ChatBubble role="ai">
            {aiResponse}
            {isLoading && (
              <>
                <div className="text-center text-textSecondary text-body-xs py-4">
                  AI가 응답 중입니다...
                </div>
                <span className="animate-pulse text-primary font-bold">▋</span>
              </>
            )}
          </ChatBubble>
        )}
        <div ref={messagesEndRef} />
      </div>

      {error && <div className="text-center text-error text-body-sm py-4">{error}</div>}

      <div className="flex items-end gap-12 mt-auto border-borderSecondary">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="여기에 문자를 붙여넣어 주세요."
          onKeyDown={handleKeyPress}
          disabled={Boolean(error)}
          inputSize="lg"
          variant="default"
          className="w-[230px]"
        />
        <Button onClick={sendMessage} disabled={!input.trim() || Boolean(error)} className="ml-12">
          전송
        </Button>
      </div>
    </div>
  );
};

export default SmishingPage;
