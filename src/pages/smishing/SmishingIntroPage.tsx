import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/common/BackButton';
import { PATH } from '@/constants/path';
import { GlassesDog, Smishing } from '@/assets/svg';

const SmishingIntroPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAnimating, setIsAnimating] = useState(true);
  const step = parseInt(searchParams.get('step') || '1');

  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    animateAndRun();
  }, []);

  const animateAndRun = (action?: () => void) => {
    setIsAnimating(true);
    setTimeout(() => {
      action?.();
      setIsAnimating(false);
    }, 150);
  };

  const handlePrev = () => {
    if (step > 1) {
      animateAndRun(() => setSearchParams({ step: '1' }));
    } else {
      navigate(PATH.ROOT);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      animateAndRun(() => setSearchParams({ step: '2' }));
    } else {
      navigate(PATH.SMISHING.PAGE);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full mx-auto rounded-8 bg-white text-center px-30 pt-40 pb-24">
      <div className="flex justify-between items-center px-4 py-3 text-body-md font-medium w-full">
        <BackButton onClick={handlePrev} />
        <span className="text-body-sm text-textSecondary">{step}/2</span>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out transform flex flex-col items-center ${
          isAnimating ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
        }`}
      >
        <img
          src={step === 1 ? GlassesDog : Smishing}
          alt="smishing icon"
          className="w-300 h-300 object-contain"
        />

        <h2 className="text-heading-h2 font-semibold text-black whitespace-pre-line leading-snug mt-20">
          {step === 1 ? (
            <>
              의심스러운 <span className="text-primary font-semibold">문자</span>나{'\n'}
              <span className="text-primary font-semibold">링크</span>를 받으셨나요?
            </>
          ) : (
            <>
              AI가 안전한 문자인지 <span className="text-primary font-semibold">확인</span>해
              드릴게요!
            </>
          )}
        </h2>

        <p className="text-body-lg text-black whitespace-pre-line leading-relaxe mt-20">
          {step === 1
            ? '문자에 포함된 링크를 클릭하지 않도록 주의해서 문자 전체를 복사해주세요.'
            : '답변이 항상 정확하지 않을 수 있으니\n 추가적인 확인을 권장해요'}
        </p>
      </div>

      <Button onClick={handleNext} ref={buttonRef} disabled={isAnimating}>
        {step === 1 ? '다음으로' : '시작하기'}
      </Button>
    </div>
  );
};

export default SmishingIntroPage;
