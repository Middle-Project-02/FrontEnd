import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRandomQuiz, submitQuizAnswer, getQuizScore } from '@/apis/quiz';
import type { QuizResponse } from '@/types/quiz';

export const useRandomQuizQuery = () => {
  return useQuery<QuizResponse>({
    queryKey: ['quiz', 'random'],
    queryFn: getRandomQuiz,
    staleTime: 5 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useSubmitQuizAnswerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userAnswer }: { id: number; userAnswer: boolean }) =>
      submitQuizAnswer(id, userAnswer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quiz', 'score'] });
    },
  });
};

export const useQuizScoreQuery = () => {
  return useQuery<{ score: number }>({
    queryKey: ['quiz', 'score'],
    queryFn: getQuizScore,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
