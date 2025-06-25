import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TTSButtonProps {
  text: string;
  isSpeaking: boolean;
  onSpeak: (text: string) => void;
  onStop: () => void;
  className?: string;
}

function TTSButton(props: TTSButtonProps) {
  const { text, isSpeaking, onSpeak, onStop, className } = props;

  const handleClick = () => {
    if (isSpeaking) {
      onStop();
    } else {
      onSpeak(text);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      size="sm"
      className={cn(
        "mt-1 ml-4 px-8 py-4 h-auto flex items-center gap-2 transition-all duration-200",
        isSpeaking 
          ? "text-blue-600 bg-blue-50 animate-slow-pulse" 
          : "text-primary hover:text-blue-600 hover:bg-blue-50",
        className
      )}
      style={{
        animation: isSpeaking ? 'slow-pulse 2s ease-in-out infinite' : 'none'
      }}
      aria-label={isSpeaking ? "음성 중지" : "음성으로 듣기"}
    >
      {isSpeaking ? (
        <>
          <VolumeX size={18} strokeWidth={1.8} />
          <span>중지</span>
          <span className="flex gap-1 ml-2">
            <span 
              className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"
              style={{ animationDelay: '0ms', animationDuration: '1.5s' }}
            ></span>
            <span 
              className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"
              style={{ animationDelay: '0.2s', animationDuration: '1.5s' }}
            ></span>
            <span 
              className="inline-block w-1.5 h-1.5 bg-blue-600 rounded-full animate-ping"
              style={{ animationDelay: '0.4s', animationDuration: '1.5s' }}
            ></span>
          </span>
        </>
      ) : (
        <>
          <Volume2 size={18} strokeWidth={1.8} />
          듣기
        </>
      )}
      <style>{`
        @keyframes slow-pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </Button>
  );
}

export default TTSButton;