import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRandomQuiz, submitQuizAnswer, getQuizScore } from '@/apis/quiz';
import type { QuizResponse } from '@/types/quiz';
import { makeToast } from '@/utils/makeToast';

const DEFAULT_STALE_TIME = 5 * 60 * 1000;
const DEFAULT_GC_TIME = 5 * 60 * 1000;
const SCORE_STALE_TIME = 60 * 1000;

export const useRandomQuizQuery = () => {
  return useQuery<QuizResponse>({
    queryKey: ['quiz', 'random'],
    queryFn: getRandomQuiz,
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
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
    onError: () => {
      makeToast('퀴즈 제출에 실패했습니다.', 'warning');
    },
  });
};

export const useQuizScoreQuery = () => {
  return useQuery<{ score: number }>({
    queryKey: ['quiz', 'score'],
    queryFn: getQuizScore,
    staleTime: SCORE_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
  });
};

export const usePrefetchQuiz = () => {
  const queryClient = useQueryClient();

  return {
    prefetchRandomQuiz: () => {
      return queryClient.prefetchQuery({
        queryKey: ['quiz', 'random'],
        queryFn: getRandomQuiz,
        staleTime: DEFAULT_STALE_TIME,
      });
    },
  };
};
