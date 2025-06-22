export interface QuizResponse {
  id: number;
  message: string;
  isSubmitted?: boolean;
  isCorrect?: boolean;
  userAnswer?: boolean;
}

export interface QuizSubmitRequest {
  id: number;
  userAnswer: boolean;
}

export interface QuizSubmitResponse {
  isCorrect: boolean;
  message: string;
  score?: number;
}

export interface QuizScore {
  score: number;
  totalQuizzes?: number;
  correctAnswers?: number;
}

export type QuizStatus = 'loading' | 'ready' | 'submitted' | 'error';

export interface QuizState {
  status: QuizStatus;
  isCorrect?: boolean;
  message?: string;
  selectedAnswer?: boolean;
}
