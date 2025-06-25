import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '@/components/common/BackButton';
import EditStep from '@/components/mypage/EditStep';
import InfoStep from '@/components/mypage/InfoStep';
import ConfirmModal from '@/components/modals/ConfirmModal';
import SuccessModal from '@/components/modals/SuccessModal';
import MyPageSkeleton from '@/components/skeleton/mypage/MyPageSkeleton';
import {
  useUserInfoQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '@/hooks/queries/user/useUserInfoQuery';
import useAuthStore from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import useFontModeStore from '@/stores/fontModeStore';
import { makeToast } from '@/utils/makeToast';
import { PATH } from '@/constants/path';
import { MyPageStep, MyPageUserInfo } from '@/types/user';

const MyPage = () => {
  const [currentStep, setCurrentStep] = useState<MyPageStep>('info');
  const [userInfo, setUserInfo] = useState<MyPageUserInfo | null>(null);
  const { userInformation, refetch, isLoading } = useUserInfoQuery();
  const { mutate: updateUser } = useUpdateUserMutation();
  const { mutate: deleteUser } = useDeleteUserMutation();
  const { setIsLoggedIn } = useAuthStore();
  const { setModal, removeModal } = useModalStore();
  const { setFontMode } = useFontModeStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInformation) return;
    setUserInfo({
      memberId: userInformation.memberId,
      nickname: userInformation.nickname,
      fontMode: userInformation.fontMode,
    });
    setFontMode(userInformation.fontMode);
  }, [userInformation]);

  const showSuccessModal = (message: string, onConfirm: () => void) => {
    setModal(<SuccessModal title={message} buttonText="확인" onSuccess={onConfirm} />);
  };

  const deleteConfirmMessage = (nickname: string) => (
    <>
      <span className="font-semibold">{nickname}</span>님의 모든 정보가{' '}
      <span className="text-error font-semibold">삭제</span>되며 복구되지 않습니다.
    </>
  );

  const handleUserDelete = () => {
    if (!userInfo) return;

    setModal(
      <ConfirmModal
        title="정말 탈퇴하시겠어요?"
        description={deleteConfirmMessage(userInfo.nickname)}
        primaryText="탈퇴하기"
        secondaryText="취소하기"
        onPrimary={() => {
          deleteUser(undefined, {
            onSuccess: () => {
              showSuccessModal('탈퇴가 완료되었어요.', () => {
                setIsLoggedIn(false);
                navigate(PATH.LOGIN);
              });
            },
            onError: () => {
              makeToast('탈퇴에 실패했어요. 다시 시도해 주세요.', 'warning');
              removeModal();
            },
          });
        }}
        onSecondary={removeModal}
      />,
    );
  };

  const handleUserUpdate = (newInfo: MyPageUserInfo, onDone: () => void) => {
    updateUser(newInfo, {
      onSuccess: async () => {
        await refetch();
        setUserInfo(newInfo);
        showSuccessModal('회원정보가 수정되었어요.', () => setCurrentStep('info'));
        onDone();
      },
      onError: () => {
        makeToast('회원 정보 수정에 실패했어요.', 'warning');
        onDone();
      },
    });
  };

  const renderStepContent = () => {
    if (isLoading) return <MyPageSkeleton />;

    if (!userInfo) return null;

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
            onDelete={handleUserDelete}
          />
        );
    }
  };

  return (
    <main className="flex flex-col bg-white min-h-screen">
      <header className="px-[30px] pt-[44px]">
        <BackButton />
        <div className="text-heading-h3 font-semibold py-4">내 정보</div>
      </header>
      <div className="w-full h-full bg-bgSecondary mt-12 pb-[100px]">
        <div className="flex flex-col items-center pt-24">{renderStepContent()}</div>
      </div>
    </main>
  );
};

export default MyPage;
