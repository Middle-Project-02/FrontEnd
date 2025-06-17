import { useEffect, useState, useRef } from 'react';
import './ChatBox.css';
import { useSse } from '@/hooks/sse/useSse';
import { useSseListener } from '@/hooks/sse/useSseListener';
import axios from 'axios';
import { PATH } from '@/constants/path';

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

  useSse(PATH.SSE.SMISHING_CONNECT);

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
    <div className="chat-box">
      <div className="chat-header">
        <h2>💬 실시간 채팅</h2>
        <div>
          <span className={`connection-status ${error ? 'disconnected' : 'connected'}`}>
            {error ? '🔴 연결 끊김' : '🟢 연결됨'}
          </span>
          <button onClick={() => setMessages([])} style={{ marginLeft: '10px' }}>
            초기화
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role === 'ai' ? 'ai-message' : 'user-message'}`}>
            <div className="message-content" style={{ whiteSpace: 'pre-wrap' }}>
              {msg.content}
            </div>
            <div className="message-time">{msg.time}</div>
          </div>
        ))}

        {aiResponse && (
          <div className="message ai-message streaming">
            <div className="message-content" style={{ whiteSpace: 'pre-wrap' }}>
              {aiResponse}
              <span className="typing-indicator">▋</span>
            </div>
            <div className="message-time">{getTime()}</div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {error && <div className="error-message">{error}</div>}
      {isLoading && <div className="loading-message">AI가 응답 중입니다...</div>}

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요"
          onKeyDown={handleKeyPress}
          disabled={Boolean(error)}
        />
        <button onClick={sendMessage} disabled={!input.trim() || Boolean(error)}>
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
