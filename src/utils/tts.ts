import { useState, useCallback, useRef, useEffect } from 'react';

class TTSManager {
  private currentSpeakingId: string | null = null;
  private listeners: Set<(speakingId: string | null) => void> = new Set();

  setCurrentSpeaking(id: string | null) {
    this.currentSpeakingId = id;
    this.listeners.forEach(listener => listener(id));
  }

  getCurrentSpeaking() {
    return this.currentSpeakingId;
  }

  addListener(listener: (speakingId: string | null) => void) {
    this.listeners.add(listener);
  }

  removeListener(listener: (speakingId: string | null) => void) {
    this.listeners.delete(listener);
  }
}

const ttsManager = new TTSManager();

export const useTTS = (messageId: string) => {
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const listener = (speakingId: string | null) => {
      setCurrentSpeakingId(speakingId);
    };
    
    ttsManager.addListener(listener);
    setCurrentSpeakingId(ttsManager.getCurrentSpeaking());

    return () => {
      ttsManager.removeListener(listener);
    };
  }, []);

  const isSpeaking = currentSpeakingId === messageId;

  const speak = useCallback((text: string, onStart?: () => void, onEnd?: () => void) => {
    if (!window.speechSynthesis) {
      console.warn('이 브라우저는 음성 합성을 지원하지 않습니다.');
      return;
    }

    if (currentSpeakingId) {
      stopSpeaking();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR'; 
    utterance.rate = 0.9; 
    utterance.pitch = 1.0; 
    utterance.volume = 1.0; 

    utterance.onstart = () => {
      ttsManager.setCurrentSpeaking(messageId);
      onStart?.();
    };

    utterance.onend = () => {
      ttsManager.setCurrentSpeaking(null);
      utteranceRef.current = null;
      onEnd?.();
    };

    utterance.onerror = (event) => {
      console.error('TTS 오류:', event.error);
      ttsManager.setCurrentSpeaking(null);
      utteranceRef.current = null;
      onEnd?.();
    };

    window.speechSynthesis.cancel();
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [messageId, currentSpeakingId]);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      ttsManager.setCurrentSpeaking(null);
      utteranceRef.current = null;
    }
  }, []);

  return {
    isSpeaking,
    speak,
    stopSpeaking
  };
};

export const useGlobalTTS = () => {
  const [currentSpeakingId, setCurrentSpeakingId] = useState<string | null>(null);

  useEffect(() => {
    const listener = (speakingId: string | null) => {
      setCurrentSpeakingId(speakingId);
    };
    
    ttsManager.addListener(listener);
    setCurrentSpeakingId(ttsManager.getCurrentSpeaking());

    return () => {
      ttsManager.removeListener(listener);
    };
  }, []);

  const speakMessage = useCallback((messageId: string, text: string) => {
    if (!window.speechSynthesis) {
      console.warn('이 브라우저는 음성 합성을 지원하지 않습니다.');
      return;
    }

    if (currentSpeakingId) {
      stopAllSpeaking();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      ttsManager.setCurrentSpeaking(messageId);
    };

    utterance.onend = () => {
      ttsManager.setCurrentSpeaking(null);
    };

    utterance.onerror = (event) => {
      console.error('TTS 오류:', event.error);
      ttsManager.setCurrentSpeaking(null);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [currentSpeakingId]);

  const stopAllSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      ttsManager.setCurrentSpeaking(null);
    }
  }, []);

  const isSpeaking = useCallback((messageId: string) => {
    return currentSpeakingId === messageId;
  }, [currentSpeakingId]);

  return {
    currentSpeakingId,
    speakMessage,
    stopAllSpeaking,
    isSpeaking
  };
};

export const speak = (text: string) => {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.9; 
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};