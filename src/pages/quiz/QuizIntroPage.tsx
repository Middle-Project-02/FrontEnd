import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/common/BackButton';
import { PATH } from '@/constants/path';
import { usePrefetchQuiz } from '@/hooks/queries/quiz/useQuizQuery';
import { OImage, XImage } from '@/assets/svg';

const SmishingQuizIntroPage = () => {
  const navigate = useNavigate();
  const { prefetchRandomQuiz } = usePrefetchQuiz();

  useEffect(() => {
    prefetchRandomQuiz();
  }, [prefetchRandomQuiz]);

  return (
    <div className="flex flex-col justify-between h-full mx-auto rounded-8 bg-white text-center px-30 pt-40 pb-24 overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 text-body-md font-medium w-full">
        <BackButton />
      </div>

      <motion.div
        className="relative w-full max-w-[360px] h-[240px] mb-24 mx-auto"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.img
          src={OImage}
          alt="O 이미지"
          className="absolute left-[0px] top-0 w-[200px]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src={XImage}
          alt="X 이미지"
          className="absolute right-[0px] top-[80px] w-[200px]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />
      </motion.div>

      <h2 className="text-heading-h2 font-bold text-black mb-12 leading-tight">
        스미싱 문자, <br />
        <span className="text-primary font-bold">퀴즈</span>로 배워요
      </h2>
      <p className="text-heading-h4 text-textSecondary mb-40">
        스미싱 문자를 보고
        <br /> OX 퀴즈를 풀어보세요
      </p>

      <Button size="lg" onClick={() => navigate(PATH.QUIZ.PAGE)}>
        퀴즈 풀기
      </Button>
    </div>
  );
};

export default SmishingQuizIntroPage;
