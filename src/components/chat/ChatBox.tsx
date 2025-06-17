import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './ChatBox.css';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

type ChatMessage = {
  role: 'user' | 'ai';
  content: string;
  time: string;
};

const ChatBox = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [aiResponse, setAiResponse] = useState('');
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const eventSourceRef = useRef<EventSource | null>(null);
  const currentAiResponseRef = useRef('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const connectSSE = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    const eventSource = new EventSource(`${import.meta.env.VITE_BASE_URL}smishing/connect`, {
      withCredentials: true,
    });

    eventSource.onopen = () => {
      console.log('SSE connection opened');
      setIsConnected(true);
      setError('');
    };

    eventSource.onmessage = (event) => {
      console.log('Default SSE message:', event.data);
    };

    eventSource.addEventListener('stream_chat', (event) => {
      const chunk = event.data;
      currentAiResponseRef.current += chunk;
      setAiResponse((prev) => prev + chunk);
    });

    eventSource.addEventListener('done', () => {
      const finalResponse = currentAiResponseRef.current;
      if (finalResponse.trim()) {
        setMessages((prev) => [...prev, { role: 'ai', content: finalResponse, time: getTime() }]);
      }
      setAiResponse('');
      currentAiResponseRef.current = '';
      setIsLoading(false);
    });

    eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      setIsConnected(false);
      setError('연결이 끊겼습니다. 다시 시도 중...');
      setTimeout(() => {
        connectSSE();
      }, 3000);
    };

    eventSourceRef.current = eventSource;
  };

  useEffect(() => {
    connectSSE();
    return () => {
      eventSourceRef.current?.close();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, aiResponse]);

  const sendMessage = async () => {
    if (!input.trim() || !isConnected) return;

    try {
      const userMessage = input.trim();
      setMessages((prev) => [...prev, { role: 'user', content: userMessage, time: getTime() }]);
      setAiResponse('');
      currentAiResponseRef.current = '';
      setInput('');
      setError('');
      setIsLoading(true);

      await apiClient.post('smishing/message', {
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
          <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢 연결됨' : '🔴 연결 끊김'}
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
          disabled={!isConnected}
        />
        <button onClick={sendMessage} disabled={!input.trim() || !isConnected}>
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
