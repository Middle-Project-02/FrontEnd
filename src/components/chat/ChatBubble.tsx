import React from 'react';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  role: 'user' | 'ai';
  children: React.ReactNode;
  className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ role, children, className }) => {
  const baseStyle =
    'px-16 py-12 rounded-24 whitespace-pre-wrap break-words leading-snug max-w-[268px]';

  const roleStyle =
    role === 'ai'
      ? 'bg-bgSecondary text-black rounded-tl-4 self-start'
      : 'bg-primary text-white rounded-tr-4 self-end';

  return (
    <div className={cn('flex', role === 'ai' ? 'self-start' : 'self-end')}>
      <div className={cn(baseStyle, roleStyle, className)}>{children}</div>
    </div>
  );
};

export default ChatBubble;
