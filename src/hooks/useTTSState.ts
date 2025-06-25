import { useState, useEffect } from 'react';

export const useTTSState = () => {
  const [globalTTSState, setGlobalTTSState] = useState({
    isAnySpeaking: false,
    currentSpeakingId: null as string | null
  });

  useEffect(() => {
    const checkSpeechSynthesis = () => {
      if (window.speechSynthesis) {
        const speaking = window.speechSynthesis.speaking;
        setGlobalTTSState(prev => ({
          ...prev,
          isAnySpeaking: speaking
        }));
      }
    };

    const interval = setInterval(checkSpeechSynthesis, 100);

    return () => clearInterval(interval);
  }, []);

  return globalTTSState;
};