import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path';
import useAuthStore from '@/stores/authStore';
import useFontModeMutation from '@/hooks/queries/auth/useFontModeMutation';
import useFixedFontSize from '@/hooks/useFixedFontSize';

const FontModePage = () => {
  const [fontMode, setFontMode] = useState<'normal' | 'large' | null>(null);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuthStore();
  const { mutatePatchFontMode } = useFontModeMutation();

  useFixedFontSize();

  const handleBackClick = () => {
    setIsLoggedIn(false);
    navigate(PATH.LOGIN, { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-[360px] px-30 pt-84 gap-44">
      <h2 className="text-heading-h2 font-semibold">
        <span className="text-primary">글씨 크기</span>를
        <br />
        선택해주세요
      </h2>
      <div className="flex w-full h-[200px] gap-16">
        <button
          className={`flex-1 border rounded-6 text-heading-h4 font-semibold ${
            fontMode === 'normal'
              ? 'bg-primary/10 border-2 border-primary text-primary'
              : 'border-gray-300 text-black hover:bg-bgSecondary'
          }`}
          onClick={() => setFontMode('normal')}
        >
          일반 글씨
        </button>
        <button
          className={`flex-1 border rounded-6 text-heading-h2 font-semibold ${
            fontMode === 'large'
              ? 'bg-primary/10 border-2 border-primary text-primary'
              : 'border-gray-300 text-black hover:bg-bgSecondary'
          }`}
          onClick={() => setFontMode('large')}
        >
          큰 글씨
        </button>
      </div>
      <div className="flex w-full justify-between">
        <Button variant="outline" outlineColor="primary" size="md" onClick={handleBackClick}>
          이전으로
        </Button>
        <Button
          variant="default"
          size="md"
          disabled={!fontMode}
          onClick={() => mutatePatchFontMode(fontMode === 'large')}
        >
          다음으로
        </Button>
      </div>
    </div>
  );
};

export default FontModePage;
