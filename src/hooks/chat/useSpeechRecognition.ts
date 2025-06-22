//응답 없을 시 자동 전송 로직 제거 버전
// import { useState, useRef, useCallback } from 'react';

// export function useSpeechRecognition() {
//   const [isListening, setIsListening] = useState(false);
//   const [transcript, setTranscript] = useState('');
//   const [interimTranscript, setInterimTranscript] = useState('');
//   const recognitionRef = useRef<any>(null);

//   const startListening = useCallback(() => {
//     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert('이 브라우저는 음성 인식을 지원하지 않습니다.');
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = 'ko-KR';
//     recognition.interimResults = true;
//     recognition.continuous = true;

//     recognition.onresult = (event: SpeechRecognitionEvent) => {
//       let interim = '';
//       for (let i = event.resultIndex; i < event.results.length; ++i) {
//         const result = event.results[i];
//         if (result.isFinal) {
//           setTranscript((prev) => prev + result[0].transcript);
//         } else {
//           interim += result[0].transcript;
//         }
//       }
//       setInterimTranscript(interim);
//     };

//     recognition.onend = () => {
//       setIsListening(false);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//     setIsListening(true);
//   }, []);

//   const stopListening = useCallback(() => {
//     recognitionRef.current?.stop();
//     setIsListening(false);
//   }, []);

//   const resetTranscript = () => {
//     setTranscript('');
//     setInterimTranscript('');
//   };

//   return {
//     isListening,
//     transcript,
//     interimTranscript,
//     startListening,
//     stopListening,
//     resetTranscript,
//   };
// }
import { useState, useRef, useCallback, useEffect } from 'react';

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  const interimRef = useRef(''); // 이전 interimTranscript 저장용
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // 타이머 ref

  const startListening = useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (event: any) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const result = event.results[i];
        if (result.isFinal) {
          setTranscript((prev) => prev + result[0].transcript);
        } else {
          interim += result[0].transcript;
        }
      }
      setInterimTranscript(interim);
    };

    recognition.onend = () => {
      setIsListening(false);
      clearTimeout(timeoutRef.current!);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
    clearTimeout(timeoutRef.current!);
  }, []);

  const resetTranscript = () => {
    setTranscript('');
    setInterimTranscript('');
  };

  // ✅ 자동 종료 타이머: interimTranscript가 멈추면 일정 시간 뒤 stop
  useEffect(() => {
    if (!isListening) return;

    // 이전과 동일한 interim이면 타이머 유지, 다르면 리셋
    if (interimTranscript === interimRef.current) return;

    // interim이 바뀐 경우 → 타이머 재설정
    interimRef.current = interimTranscript;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      stopListening();
    }, 3000);
  }, [interimTranscript, isListening, stopListening]);

  return {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
  };
}
