import { axiosInstance } from './axiosInstance';
import { END_POINTS } from '@/constants/api';
import type { QuizResponse, QuizSubmitResponse } from '@/types/quiz';

export const getRandomQuiz = async (): Promise<QuizResponse> => {
  const response = await axiosInstance.get(END_POINTS.QUIZ.RANDOM);
  return response.data;
};

export const submitQuizAnswer = async (
  id: number,
  userAnswer: boolean,
): Promise<QuizSubmitResponse> => {
  const response = await axiosInstance.post(END_POINTS.QUIZ.SUBMIT, null, {
    params: { quizId: id, userAnswer },
  });
  return response.data;
};

export const getQuizScore = async (): Promise<{ score: number }> => {
  const response = await axiosInstance.get(END_POINTS.QUIZ.SCORE);
  return response.data;
};
