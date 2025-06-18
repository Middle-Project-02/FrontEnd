import { useEffect, useState, useRef } from 'react';
import { useSse } from '@/hooks/sse/useSse';
import { useSseListener } from '@/hooks/sse/useSseListener';
import axios from 'axios';
import { PATH } from '@/constants/path';
import { Button } from '@/components/ui/button';

type ChatMessage = {
  role: 'user' | 'ai';
  content: string;
  time: string;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

const ChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [aiResponse, setAiResponse] = useState('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const currentAiResponseRef = useRef('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  useSse(PATH.SMISHING.CONNECT);

  useSseListener('stream_chat', (chunk) => {
    currentAiResponseRef.current += chunk;
    setAiResponse((prev) => prev + chunk);
  });

  useSseListener('done', () => {
    const finalResponse = currentAiResponseRef.current;
    if (finalResponse.trim()) {
      setMessages((prev) => [...prev, { role: 'ai', content: finalResponse, time: getTime() }]);
    }
    setAiResponse('');
    currentAiResponseRef.current = '';
    setIsLoading(false);
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, aiResponse]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    try {
      const userMessage = input.trim();
      setMessages((prev) => [...prev, { role: 'user', content: userMessage, time: getTime() }]);
      setAiResponse('');
      currentAiResponseRef.current = '';
      setInput('');
      setError('');
      setIsLoading(true);

      await apiClient.post(PATH.SMISHING.MESSAGE, {
        content: userMessage,
      });
    } catch (err) {
      console.error('메시지 전송 실패:', err);
      setError('메시지 전송에 실패했습니다.');
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col max-w-[800px] h-[600px] mx-auto border border-borderSecondary rounded-8 bg-white shadow-shadow8">
      {/* Header */}
      <div className="flex justify-between items-center px-20 py-16 border-b border-borderSecondary bg-bgTertiary">
        <h2 className="text-heading-h4 font-semibold text-black">💬 실시간 채팅</h2>
        <div className="flex items-center gap-8">
          <span
            className={`text-body-xs font-medium px-12 py-4 rounded-12 ${
              error ? 'text-error bg-red-100' : 'text-success bg-green-100'
            }`}
          >
            {error ? '🔴 연결 끊김' : '🟢 연결됨'}
          </span>
          <Button variant="outline" size="sm" onClick={() => setMessages([])}>
            초기화
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-20 py-20 flex flex-col gap-12 text-body-lg">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'ai' ? 'self-start' : 'self-end'}`}>
            <div
              className={`px-16 py-12 rounded-24 max-w-[80%] whitespace-pre-wrap break-words leading-snug ${
                msg.role === 'ai'
                  ? 'bg-bgSecondary text-black rounded-bl-4'
                  : 'bg-primary text-white rounded-br-4'
              }`}
            >
              {msg.content}
            </div>
            <div className="text-body-xxs text-textSecondary ml-4 self-end">{msg.time}</div>
          </div>
        ))}

        {aiResponse && (
          <div className="flex self-start">
            <div className="px-16 py-12 rounded-24 max-w-[80%] bg-blue-100 border border-blue-300 text-black rounded-bl-4 whitespace-pre-wrap break-words leading-snug">
              {aiResponse}
              {isLoading && (
                <div className="text-center text-textSecondary text-body-xs py-4">
                  AI가 응답 중입니다...
                </div>
              )}
              <span className="animate-pulse text-primary font-bold">▋</span>
            </div>
            <div className="text-body-xxs text-textSecondary ml-4 self-end">{getTime()}</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && <div className="text-center text-error text-body-sm py-4">{error}</div>}

      {/* Input */}
      <div className="flex px-20 py-16 border-t border-borderSecondary bg-bgTertiary">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
          onKeyDown={handleKeyPress}
          disabled={Boolean(error)}
          className="flex-1 px-16 py-12 rounded-circle border border-borderSecondary text-body-sm outline-none disabled:bg-bgSecondary disabled:text-textSecondary"
        />
        <Button onClick={sendMessage} disabled={!input.trim() || Boolean(error)} className="ml-12">
          전송
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
