import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser, patchUpdateUserInfo } from '@/apis/user';
import BackButton from '@/components/common/BackButton';
import EditStep from '@/components/mypage/EditStep';
import InfoStep from '@/components/mypage/InfoStep';
import { PATH } from '@/constants/path';
import { MyPageStep, MyPageUserInfo } from '@/types/user';
import useUserInfoQuery from '@/hooks/queries/user/useUserInfoQuery';
import useAuthStore from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import ConfirmModal from '@/components/modals/ConfirmModal';
import SuccessModal from '@/components/modals/SuccessModal';
import { makeToast } from '@/utils/makeToast';

const MyPage = () => {
  const [currentStep, setCurrentStep] = useState<MyPageStep>('info');
  const [userInfo, setUserInfo] = useState<MyPageUserInfo | null>(null);
  const { userInformation } = useUserInfoQuery();
  const { setIsLoggedIn } = useAuthStore();
  const { setModal, removeModal } = useModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInformation) {
      setUserInfo({
        memberId: userInformation.memberId,
        nickname: userInformation.nickname,
        fontMode: false,
      });
    }
  }, [userInformation]);

  const handleUserDeleteClick = () => {
    setModal(
      <ConfirmModal
        title="정말 탈퇴하시겠어요?"
        description="회원 탈퇴 시 모든 정보가 삭제되며 복구되지 않습니다."
        primaryText="탈퇴하기"
        secondaryText="취소하기"
        onPrimary={async () => {
          try {
            await deleteUser();
            setModal(
              <SuccessModal
                title="탈퇴가 완료되었어요."
                buttonText="확인"
                onSuccess={() => {
                  setIsLoggedIn(false);
                  navigate(PATH.LOGIN);
                }}
              />,
            );
          } catch {
            makeToast('탈퇴에 실패했어요. 다시 시도해 주세요.', 'warning');
            removeModal();
          }
        }}
        onSecondary={removeModal}
      />,
    );
  };

  const handleUserUpdate = async (newInfo: MyPageUserInfo) => {
    try {
      await patchUpdateUserInfo({
        nickname: newInfo.nickname,
        fontMode: newInfo.fontMode,
      });
      setUserInfo(newInfo);

      setModal(
        <SuccessModal
          title="회원정보가 수정되었어요."
          buttonText="확인"
          onSuccess={() => {
            setCurrentStep('info');
          }}
        />,
      );
    } catch (error) {
      console.error('회원 정보 수정 실패', error);
      makeToast('회원 정보 수정에 실패했어요. 다시 시도해 주세요.', 'warning');
    }
  };

  const renderStepContent = () => {
    if (!userInfo) return null;

    if (currentStep === 'info') {
      return (
        <InfoStep
          userInfo={userInfo}
          onEdit={() => setCurrentStep('edit')}
          onDeleteClick={handleUserDeleteClick}
        />
      );
    }

    return (
      <EditStep
        userInfo={userInfo}
        onSave={handleUserUpdate}
        onCancel={() => setCurrentStep('info')}
      />
    );
  };

  return (
    <main className="pt-44 px-30 flex flex-col gap-24">
      <BackButton />
      {renderStepContent()}
    </main>
  );
};

export default MyPage;
