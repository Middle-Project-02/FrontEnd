export const speak = (text: string) => {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};
