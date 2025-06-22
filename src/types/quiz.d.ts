export interface QuizResponse {
  id: number;
  message: string;
  correctAnswer: boolean;
  explanationIfCorrect: string;
  explanationIfWrong: string;
}
export interface QuizSubmitResponse {
  message: string;
  totalScore: number;
  isCorrect: boolean;
}
