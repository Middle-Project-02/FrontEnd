import { MyPageUserInfo } from '@/types/user';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface InfoStepProps {
  userInfo: MyPageUserInfo;
  onEdit: () => void;
  onDelete: () => void;
}

const InfoStep = ({ userInfo, onEdit, onDelete }: InfoStepProps) => {
  //모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //fontMode를 화면에 표시할 텍스트로 변환
  const getFontModeText = (fontMode: boolean) => {
    return fontMode ? '큰 글씨' : '보통 글씨';
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    onDelete(); //부모의 전역 로직 호출
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      {/* 사용자 정보 섹션 */}
      <section className="flex flex-col gap-12">
        <h1 className="text-heading-h3">내 정보</h1>
        <article className="flex flex-col px-16 py-20 gap-12 rounded-16 bg-bgTertiary border-borderSecondary border-1">
          <h2 className="text-body-lg font-semibold">김테스트</h2>
          <h2 className="text-body-md">전화번호</h2>
          <p>{userInfo.memberId}</p>
          <h2 className="text-body-md">글씨 크기</h2>
          <p>현재 {getFontModeText(userInfo.fontMode)} 적용 중 입니다.</p>
          <div className="flex justify-end">
            <Button variant="default" size="md" onClick={onEdit}>
              수정하기
            </Button>
          </div>
        </article>
      </section>

      {/* 회원 탈퇴 섹션 */}
      <section className="flex justify-between items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-body-md font-semibold">회원 탈퇴</h1>
          <p className="text-body-sm text-textSecondary">
            탈퇴 시 모든 데이터가
            <br />
            삭제되며 복구되지 않습니다.
          </p>
        </div>
        <Button variant="secondary" size="md" onClick={handleDeleteClick}>
          탈퇴하기
        </Button>
      </section>

      {/* 회원 탈퇴 모달 */}
      {isDeleteModalOpen && (
        <div className="bg-bgSecondary">
          <p>정말 탈퇴?</p>
          <Button onClick={handleDeleteCancel}>돌아가기</Button>
          <Button onClick={handleDelete}>탈퇴하기</Button>
        </div>
      )}
    </>
  );
};

export default InfoStep;
