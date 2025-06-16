import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '@/apis/axiosInstance';
import useAuthStore from '@/stores/authStore';
import useUserInfoQuery from '@/hooks/queries/user/useUserInfoQuery';
import useFAQChipsQuery from '@/hooks/queries/faq/useFAQChipsQuery';
import useFAQChipAnswerQuery from '@/hooks/queries/faq/useFAQChipsAnswerQuery';

const MainPage = () => {
  const [selectedChipId, setSelectedChipId] = useState<number | null>(null);
  const { userInformation } = useUserInfoQuery();
  const { faqChips } = useFAQChipsQuery();
  const { chipAnswer } = useFAQChipAnswerQuery(selectedChipId!);
  const { setIsLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const logout = async () => {
    const response = await axiosInstance.post('auth/logout', {});

    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleChipClick = (chipId: number) => {
    setSelectedChipId(chipId);
  };

  return (
    <div className="text-white p-4">
      MainPage 입니다.
      <button className="bg-green-400 w-20" onClick={logout}>
        로그아웃
      </button>
      <div>{userInformation && userInformation.nickname}</div>
      <div>
        {faqChips?.map((chip) => (
          <button key={chip.id} onClick={() => handleChipClick(chip.id)} className="p-2">
            {chip.question}
          </button>
        ))}
      </div>
      {selectedChipId && <div>{chipAnswer?.answer}</div>}
    </div>
  );
};

export default MainPage;
