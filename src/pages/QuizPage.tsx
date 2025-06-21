import { ReactNode, useEffect, useState } from 'react';
import ChatBubble from '@/components/chat/ChatBubble';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/common/BackButton';
import { useRandomQuizQuery, useSubmitQuizAnswerMutation } from '@/hooks/queries/quiz/useQuizQuery';
import type { QuizResponse } from '@/types/quiz';
import { Circle, X, AlertCircle, CheckCircle } from 'lucide-react';

const QuizPage = () => {
  const { data: quiz, refetch, isFetching } = useRandomQuizQuery();
  const { mutate: submitAnswer } = useSubmitQuizAnswerMutation();

  const [currentQuiz, setCurrentQuiz] = useState<QuizResponse | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<string>('');
  const [judgement, setJudgement] = useState<ReactNode>('');
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  useEffect(() => {
    if (quiz) setCurrentQuiz(quiz);
  }, [quiz]);

  const handleSubmit = (userAnswer: boolean) => {
    if (!currentQuiz || submitted) return;
    setSelectedAnswer(userAnswer);

    submitAnswer(
      { id: currentQuiz.id, userAnswer },
      {
        onSuccess: (res) => {
          setJudgement(
            <span className="flex items-center gap-8">
              {res.isCorrect ? (
                <>
                  <CheckCircle className="w-20 h-20 text-success" />
                  <span className="text-heading-h4">정답이에요!</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-20 h-20 text-error" />
                  <span className="text-heading-h4">오답이에요!</span>
                </>
              )}
            </span>,
          );
          setResult(res.message);
          setSubmitted(true);
        },
        onError: () => {
          setResult('오류가 발생했어요. 다시 시도해 주세요.');
          setSubmitted(true);
        },
      },
    );
  };

  const handleNext = async () => {
    setSubmitted(false);
    setResult('');
    setJudgement('');
    setSelectedAnswer(null);
    setCurrentQuiz(null);
    const res = await refetch();
    setCurrentQuiz(res.data ?? null);
  };

  return (
    <div className="flex flex-col justify-start h-full mx-auto rounded-8 bg-white px-30 pt-40 pb-4">
      <div className="flex items-center justify-between px-4 py-3 text-body-md font-medium">
        <BackButton />
      </div>

      <h2 className="text-heading-h3 font-semibold text-black">스미싱 퀴즈에 도전해보세요!</h2>
      <div className="text-heading-h4 font-semibold text-textSecondary">
        아래 문자는 <span className="text-primary">스미싱</span> 문자일까요?
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-12 text-body-lg w-[300px] mt-12 mb-12">
        {isFetching && (
          <ChatBubble role="ai">
            <span className="ml-1 animate-pulse">문제를 불러오는 중입니다...</span>
          </ChatBubble>
        )}
        {currentQuiz && !isFetching && <ChatBubble role="ai">{currentQuiz.message}</ChatBubble>}
        {judgement && <p className="text-body-md font-semibold text-primary">{judgement}</p>}
        {submitted && <div className="text-body-md text-black whitespace-pre-wrap">{result}</div>}
      </div>

      {!submitted && currentQuiz && (
        <>
          <p className="text-heading-h4 font-semibold text-black mb-16">
            스미싱이라고 생각하면 <span className="text-primary">O</span>,
            <br />
            그렇지 않으면 <span className="text-error">X</span>를 눌러주세요
          </p>
          <div className="flex gap-20">
            <button
              onClick={() => handleSubmit(true)}
              className={`flex-1 py-30 text-heading-h3 rounded-16 font-bold border flex justify-center items-center transition-all duration-300 ease-in-out
                ${
                  selectedAnswer === true
                    ? 'bg-primary text-white border-primary ring-2 ring-primary'
                    : 'bg-primary/20 text-primary hover:bg-primary/40 active:border-primary'
                }
              `}
            >
              <Circle
                className={`w-[80px] h-[80px] transition-all duration-300 ease-in-out
                  ${selectedAnswer === true ? 'text-white scale-110' : 'text-primary/20'}
                `}
              />
            </button>

            <button
              onClick={() => handleSubmit(false)}
              className={`flex-1 py-30 text-heading-h3 rounded-16 font-bold border flex justify-center items-center transition-all duration-300 ease-in-out
                ${
                  selectedAnswer === false
                    ? 'bg-error text-white border-error ring-2 ring-error'
                    : 'bg-error/20 text-error hover:bg-error/30 active:border-error'
                }
              `}
            >
              <X
                className={`w-[80px] h-[80px] transition-all duration-300 ease-in-out
                  ${selectedAnswer === false ? 'text-white scale-110' : 'text-error/20'}
                `}
              />
            </button>
          </div>
        </>
      )}

      <div className="mt-8 flex gap-12 mb-16">
        {submitted && (
          <>
            <Button
              onClick={() => history.back()}
              className="flex-1 bg-bgSecondary text-black border border-borderSecondary"
            >
              종료하기
            </Button>
            <Button onClick={handleNext} className="flex-1">
              다음 문제 풀기
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
