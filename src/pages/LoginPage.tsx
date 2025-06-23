import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PATH } from '@/constants/path';
import { KAKAO_API_URL } from '@/constants/api';
import useLoginMutation from '@/hooks/queries/auth/useLoginMutation';
import { KakaoLogin } from '@/assets/svg';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    memberId: '',
    password: '',
  });
  const [errorText, setErrorText] = useState('');
  const memberIdRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { mutatePostLogin } = useLoginMutation();

  const checkFormData = () => {
    if (!formData.memberId.trim()) {
      setErrorText('전화번호를 입력해 주세요.');
      memberIdRef.current?.focus();
      return true;
    }

    if (!formData.password.trim()) {
      setErrorText('비밀번호를 입력해 주세요.');
      passwordRef.current?.focus();
      return true;
    }

    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkFormData()) return;

    try {
      await mutatePostLogin(formData);
    } catch (error) {
      setErrorText('전화번호 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-[360px] items-center px-30 pt-84 gap-40">
      <h2 className="text-heading-h2 text-primary font-semibold text-center">투게더</h2>
      <div className="flex flex-col w-full gap-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
          <Input
            inputSize="lg"
            name="memberId"
            placeholder="전화번호"
            value={formData.memberId}
            onChange={handleChange}
            ref={memberIdRef}
          />
          <Input
            inputSize="lg"
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            ref={passwordRef}
          />
          <div className="h-[16px] text-body-sm text-error">{errorText}</div>
          <Button type="submit" variant="default" size="md">
            시작하기
          </Button>
        </form>
        <div className="flex flex-col gap-16">
          <Button
            variant="outline"
            outlineColor="primary"
            size="md"
            onClick={() => navigate(PATH.SIGNUP)}
          >
            처음 오셨나요? 가입하기
          </Button>
          <div className="flex items-center gap-12 w-full">
            <div className="flex-1 h-[1px] bg-borderSecondary" />
            <span className="text-body-sm text-textSecondary whitespace-nowrap">간편 로그인</span>
            <div className="flex-1 h-[1px] bg-borderSecondary" />
          </div>
          <button
            className="cursor-pointer rounded-6 border-none bg-transparent"
            onClick={() => (window.location.href = KAKAO_API_URL)}
          >
            <img src={KakaoLogin} alt="KakaoLogin" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
