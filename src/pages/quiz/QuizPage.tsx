import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBubble from '@/components/chat/ChatBubble';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/common/BackButton';
import { QUIZ_STATES, ANSWER_LABELS } from '@/constants/quiz';
import { PATH } from '@/constants/path';
import { useRandomQuizQuery, useSubmitQuizAnswerMutation } from '@/hooks/queries/quiz/useQuizQuery';
import { makeToast } from '@/utils/makeToast';
import { Circle, X, AlertCircle, CircleCheck, LoaderCircle } from 'lucide-react';

const QuizPage = () => {
  const { data: quiz, refetch, isFetching } = useRandomQuizQuery();
  const { mutate: submitAnswer, isPending: isSubmitting } = useSubmitQuizAnswerMutation();

  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [localState, setLocalState] = useState<{
    isCorrect: boolean;
    message: string;
    selectedAnswer: boolean;
  } | null>(null);

  const quizState = useMemo(() => {
    if (!quiz) return { status: QUIZ_STATES.LOADING };
    if (localState) {
      return {
        status: QUIZ_STATES.SUBMITTED,
        isCorrect: localState.isCorrect,
        message: localState.message,
        selectedAnswer: localState.selectedAnswer,
      };
    }
    return { status: QUIZ_STATES.READY };
  }, [quiz, localState]);

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (userAnswer: boolean) => {
      if (!quiz || quizState.status !== QUIZ_STATES.READY || isSubmitting) return;

      setSelectedAnswer(userAnswer);

      submitAnswer(
        { id: quiz.id, userAnswer },
        {
          onSuccess: (res) => {
            setLocalState({
              isCorrect: res.isCorrect,
              message: res.message,
              selectedAnswer: userAnswer,
            });
          },
          onError: () => {
            makeToast('퀴즈 제출에 실패했습니다.', 'warning');
          },
        },
      );
    },
    [quiz, quizState.status, isSubmitting, submitAnswer],
  );

  const handleNext = useCallback(() => {
    setSelectedAnswer(null);
    setLocalState(null);
    refetch();
  }, [refetch]);

  const handleExit = useCallback(() => {
    navigate(PATH.HOME);
  }, []);

  const JudgementResult = () => {
    if (quizState.status !== QUIZ_STATES.SUBMITTED) return null;

    const { isCorrect } = quizState;
    const Icon = isCorrect ? CircleCheck : AlertCircle;
    const colorClass = isCorrect ? 'text-success' : 'text-error';
    const text = isCorrect ? '정답이에요!' : '오답이에요!';

    return (
      <div className="flex items-center gap-8 text-heading-h4 font-semibold text-primary">
        <Icon className={`w-20 h-20 ${colorClass}`} />
        <span>{text}</span>
      </div>
    );
  };

  const AnswerButton = ({
    answer,
    icon: Icon,
    colorScheme,
  }: {
    answer: boolean;
    icon: typeof Circle;
    label: string;
    colorScheme: 'primary' | 'error';
  }) => {
    const isSelected =
      quizState.status === QUIZ_STATES.SUBMITTED
        ? quizState.selectedAnswer === answer
        : selectedAnswer === answer;

    const baseClasses =
      'flex-1 py-30 text-heading-h3 rounded-16 font-bold border flex justify-center items-center transition-all duration-300 ease-in-out';

    const getButtonClasses = () => {
      if (isSelected) {
        return `${baseClasses} ${
          colorScheme === 'primary'
            ? 'bg-primary text-white border-primary ring-2 ring-primary'
            : 'bg-error text-white border-error ring-2 ring-error'
        }`;
      }

      return `${baseClasses} ${
        colorScheme === 'primary'
          ? 'bg-primary/20 text-primary hover:bg-primary/40 active:border-primary'
          : 'bg-error/20 text-error hover:bg-error/30 active:border-error'
      }`;
    };

    const getIconClasses = () => {
      const baseIconClasses = 'w-[80px] h-[80px] transition-all duration-300 ease-in-out';
      if (isSelected) return `${baseIconClasses} text-white scale-110`;

      return `${baseIconClasses} ${
        colorScheme === 'primary' ? 'text-primary/20' : 'text-error/20'
      }`;
    };

    return (
      <button
        onClick={() => handleSubmit(answer)}
        disabled={quizState.status !== QUIZ_STATES.READY || isSubmitting}
        className={getButtonClasses()}
      >
        <Icon className={getIconClasses()} />
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full mx-auto rounded-8 bg-white px-30 pt-32 pb-16">
      <header className="flex items-center justify-between px-4 py-3 text-body-md font-medium">
        <BackButton onClick={() => navigate(PATH.HOME)} />
      </header>

      <div className="mb-12">
        <h2 className="text-heading-h3 font-semibold text-black">스미싱 퀴즈에 도전해보세요!</h2>
        <p className="text-heading-h4 font-semibold text-textSecondary mt-4">
          아래 문자는 <span className="text-primary">스미싱</span> 문자일까요?
        </p>
      </div>

      <main className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-12 text-body-lg w-[300px] mb-12">
        {isFetching ? (
          <ChatBubble role="ai">
            <span className="ml-1 animate-pulse">문제를 불러오는 중입니다...</span>
          </ChatBubble>
        ) : quiz ? (
          <ChatBubble role="ai">{quiz.message}</ChatBubble>
        ) : null}

        {isSubmitting && (
          <div className="flex items-center justify-center gap-8 text-body-md text-textSecondary">
            <LoaderCircle className="animate-spin w-20 h-20" />
            <span>채점 중입니다...</span>
          </div>
        )}

        <JudgementResult />

        {quizState.status === QUIZ_STATES.SUBMITTED && quizState.message && (
          <div className="text-body-md text-black whitespace-pre-wrap">{quizState.message}</div>
        )}
      </main>

      {quizState.status === QUIZ_STATES.READY && quiz && (
        <section className="mt-8">
          <p className="text-heading-h4 font-semibold text-black mb-12">
            스미싱이라고 생각하면 <span className="text-primary">{ANSWER_LABELS.TRUE}</span>,<br />
            그렇지 않으면 <span className="text-error">{ANSWER_LABELS.FALSE}</span>를 눌러주세요
          </p>
          <div className="flex gap-20">
            <AnswerButton
              answer={true}
              icon={Circle}
              label={ANSWER_LABELS.TRUE}
              colorScheme="primary"
            />
            <AnswerButton answer={false} icon={X} label={ANSWER_LABELS.FALSE} colorScheme="error" />
          </div>
        </section>
      )}

      {quizState.status === QUIZ_STATES.SUBMITTED && (
        <footer className="mt-8 flex gap-12">
          <Button
            onClick={handleExit}
            variant="outline"
            className="flex-1 bg-bgSecondary text-black border border-borderSecondary"
          >
            종료하기
          </Button>
          <Button onClick={handleNext} className="flex-1" disabled={isFetching}>
            다음 문제 풀기
          </Button>
        </footer>
      )}
    </div>
  );
};

export default QuizPage;
