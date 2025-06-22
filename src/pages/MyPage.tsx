import { deleteUser, patchUpdateUserInfo } from '@/apis/user';
import BackButton from '@/components/common/BackButton';
import EditStep from '@/components/mypage/EditStep';
import InfoStep from '@/components/mypage/InfoStep';
import { PATH } from '@/constants/path';
import { MyPageStep, MyPageUserInfo } from '@/types/user';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const [currentStep, setCurrentStep] = useState<MyPageStep>('info');
  const [userInfo, setUserInfo] = useState({
    nickname: '김테스트',
    memberId: '010-1234-5678',
    fontMode: false,
  });

  const navigate = useNavigate();

  // 회원 탈퇴 처리
  const handleUserDelete = async () => {
    try {
      navigate(PATH.LOGIN);
      console.log('탈퇴 완료');
    } catch (error) {
      console.log('탈퇴 처리 중 오류 : ', error);
    }
  };

  // 회원정보 수정 처리
  const handleUserUpdate = async (newInfo: MyPageUserInfo) => {
    try {
      await patchUpdateUserInfo({
        nickname: newInfo.nickname,
        fontMode: newInfo.fontMode,
      });
      setUserInfo(newInfo);
      setCurrentStep('info');
      console.log('회원 정보 수정 완료: ', newInfo);
    } catch (error) {
      console.log('회원 정보 수정 실패', error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'info':
        return (
          <InfoStep
            userInfo={userInfo}
            onEdit={() => setCurrentStep('edit')}
            onDelete={handleUserDelete}
          />
        );

      case 'edit':
        return (
          <EditStep
            userInfo={userInfo}
            onSave={handleUserUpdate}
            onCancel={() => setCurrentStep('info')}
          />
        );
    }
  };

  return (
    <main className="pt-44 px-30 flex flex-col gap-24">
      <BackButton />
      {renderStepContent()}
    </main>
  );
};

export default MyPage;
